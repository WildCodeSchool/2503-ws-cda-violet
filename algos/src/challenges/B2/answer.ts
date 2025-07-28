/**
 * In this challenge, you have to get all the images sent in a conversation (list of messages).
 * Images must be sorted by message datetime they are attached to (oldest first, if datetimes are the same, should be sorted by content length (shortest first)).
 * You should not display duplicates. If duplicates are found, the recent one should be kept.
 * This algo is useful to create a medias gallery in a conversation app (such as in WhatsApp conversations)
 *
 * @param messages List of messages with their images
 * @returns All existing images sorted by their parent datetimes (recent first), without duplicates
 */

// ↓ uncomment bellow lines and add your response!
export default function ({
  messages,
}: {
  messages: MessageWithImages[];
}): string[] {
  // (NB: "..." === "le contenu de")
  const images = messages
    // trier messages par ordre d'envoi / lgueur message [B1]
    .sort((msgA, msgB) => {
      const diff = msgA.sentAt.localeCompare(msgB.sentAt);
      if (diff) return diff;
      return msgA.content.length - msgB.content.length;
    })
    // créer array acc [A2 ?]
    // mapper sur messages
    .reduce((acc, message) => {
      // acc.push (<- faites pas ça) ou acc = [...acc, ...images]
      return [...acc, ...message.images];
    }, [] as string[]);

  // dedoublonner: créer un Set à partir d'acc, puis le retransformer en tableau [A2]
  const deduped = [...new Set(images)];
  // return
  return deduped;
}

// used interfaces, do not touch
export interface MessageWithImages {
  sentBy: string;
  content: string;
  images: string[];
  sentAt: string;
}
