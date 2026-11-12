import { NextRequest, NextResponse } from 'next/server';
import { verifyMetaWebhookChallenge, sendInstagramDirectMessage } from '@/lib/meta-graph-api';

/**
 * Meta Webhook Verification Endpoint (GET)
 * Meta ping this endpoint with hub.mode, hub.challenge, and hub.verify_token
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  const result = verifyMetaWebhookChallenge(mode, token, challenge);

  if (result.verified && result.challenge) {
    // Meta requires the raw challenge string in plain text with 200 OK
    return new NextResponse(result.challenge, {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  return NextResponse.json(
    { error: result.error || 'Forbidden' },
    { status: 403 }
  );
}

/**
 * Meta Webhook Event Processor (POST)
 * Receives Instagram comments, story mentions, and direct messages
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Verify object is instagram
    if (body.object !== 'instagram' && body.object !== 'page') {
      return NextResponse.json({ status: 'IGNORED', message: 'Not an Instagram event' });
    }

    const entries = body.entry || [];
    const executionResults = [];

    for (const entry of entries) {
      // 1. Process Comments on Posts / Reels
      if (entry.changes) {
        for (const change of entry.changes) {
          if (change.field === 'comments') {
            const commentVal = change.value;
            const text = (commentVal.text || '').toUpperCase();
            const senderId = commentVal.from?.id;

            // Check if comment matches keywords like LINK, VIP, COACH
            let replyText = 'Thanks for your comment! Here is your requested resource link:';
            let buttonText = 'View Resource';
            let buttonUrl = 'https://instadm.dev';

            if (text.includes('LINK')) {
              replyText = 'Hey! 👋 Here is your instant 2026 Growth Playbook PDF:';
              buttonText = 'Download PDF Guide';
              buttonUrl = 'https://instadm.dev/resources/growth-playbook.pdf';
            } else if (text.includes('VIP') || text.includes('DEAL')) {
              replyText = 'Woohoo! 🎉 You unlocked 30% off with coupon code VIP30:';
              buttonText = 'Shop 30% VIP';
              buttonUrl = 'https://instadm.dev/store?code=VIP30';
            } else if (text.includes('COACH')) {
              replyText = 'Ready to scale? Book your free 15-minute strategy call:';
              buttonText = 'Book Strategy Call';
              buttonUrl = 'https://instadm.dev/calendar/apply';
            }

            // Dispatch DM
            const dmResult = await sendInstagramDirectMessage(
              senderId,
              replyText,
              { text: buttonText, url: buttonUrl }
            );

            executionResults.push({
              type: 'COMMENT_TO_DM',
              sender: commentVal.from?.username || senderId,
              dmResult,
            });
          }
        }
      }

      // 2. Process Direct Messages
      if (entry.messaging) {
        for (const messagingEvent of entry.messaging) {
          const senderId = messagingEvent.sender?.id;
          const msgText = (messagingEvent.message?.text || '').toUpperCase();

          if (senderId && msgText) {
            const dmResult = await sendInstagramDirectMessage(
              senderId,
              'Thanks for messaging InstaDM! Our AI Assistant is processing your request:',
              { text: 'Explore Platform', url: 'https://instadm.dev' }
            );
            executionResults.push({ type: 'DM_RESPONSE', senderId, dmResult });
          }
        }
      }
    }

    // Always respond 200 OK within 20 seconds to comply with Meta webhook delivery timeout
    return NextResponse.json({
      status: 'EVENT_RECEIVED',
      processedEntries: entries.length,
      executions: executionResults,
    });
  } catch (error) {
    return NextResponse.json(
      { status: 'ERROR', error: (error as Error).message },
      { status: 500 }
    );
  }
}
