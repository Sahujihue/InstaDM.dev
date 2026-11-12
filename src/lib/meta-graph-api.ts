/**
 * Official Meta Instagram Graph API & Messaging API Utilities
 * Adheres to Meta v21.0 Graph API guidelines
 */

export const META_API_VERSION = 'v21.0';
export const META_GRAPH_BASE = `https://graph.facebook.com/${META_API_VERSION}`;
export const DEFAULT_VERIFY_TOKEN = 'instadm_meta_verify_token_prod_2026';

export interface MetaWebhookChallengeResult {
  verified: boolean;
  challenge?: string;
  error?: string;
}

/**
 * Validates Meta Webhook verification GET request
 */
export function verifyMetaWebhookChallenge(
  mode: string | null,
  verifyToken: string | null,
  challenge: string | null,
  configuredToken: string = DEFAULT_VERIFY_TOKEN
): MetaWebhookChallengeResult {
  if (mode === 'subscribe' && verifyToken === configuredToken && challenge) {
    return {
      verified: true,
      challenge,
    };
  }
  return {
    verified: false,
    error: 'Verification token mismatch or invalid mode',
  };
}

/**
 * Dispatches an automated Instagram Direct Message via Graph API
 */
export async function sendInstagramDirectMessage(
  igUserId: string,
  messageText: string,
  button?: { text: string; url: string },
  accessToken?: string
) {
  // If no live access token, simulate success for demo sandbox environment
  if (!accessToken) {
    return {
      success: true,
      simulated: true,
      message_id: `mid_${Date.now()}_simulated`,
      recipient_id: igUserId,
      delivery_status: 'DELIVERED',
      timestamp: new Date().toISOString(),
    };
  }

  // Official Graph API payload structure
  const payload = {
    recipient: { id: igUserId },
    message: {
      text: messageText,
      ...(button && {
        attachment: {
          type: 'template',
          payload: {
            template_type: 'button',
            text: messageText,
            buttons: [
              {
                type: 'web_url',
                url: button.url,
                title: button.text,
              },
            ],
          },
        },
      }),
    },
  };

  try {
    const res = await fetch(`${META_GRAPH_BASE}/me/messages?access_token=${accessToken}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    return { success: res.ok, data };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

/**
 * Replies to an Instagram Post or Reel Comment
 */
export async function replyToInstagramComment(
  commentId: string,
  replyText: string,
  accessToken?: string
) {
  if (!accessToken) {
    return {
      success: true,
      simulated: true,
      reply_id: `rep_${Date.now()}_simulated`,
      comment_id: commentId,
    };
  }

  try {
    const res = await fetch(`${META_GRAPH_BASE}/${commentId}/replies?access_token=${accessToken}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: replyText }),
    });
    const data = await res.json();
    return { success: res.ok, data };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}
