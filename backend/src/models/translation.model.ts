import db from "../lib/db.ts";
import type { CreateTranslationBody, SlangTerm } from "../types/index.ts";

const getTranslationById = async (id: string) => {
  const translation = await db.translation.findUnique({
    where: { id },
    include: {
      slangMentions: {
        include: {
          slangTerm: true,
        },
      },
      user: true,
    },
  });
  return translation;
};

const getAllTranslationsByUser = async (userId: string) => {
  const translations = await db.translation.findMany({
    where: { userId },
    include: {
      slangMentions: {
        include: {
          slangTerm: true,
        },
      },
      user: true,
    },
  });
  return translations;
};

const getOrCreateSlangTermIds = async (slangTerms: SlangTerm[]) => {
  const slangTermIds = await Promise.all(
    slangTerms.map(async (slang) => {
      const term = await db.slangTerm.upsert({
        where: { term: slang.term },
        update: {
          meaning: slang.meaning,
          example: slang.example,
          origin: slang.origin,
        },
        create: {
          term: slang.term,
          meaning: slang.meaning,
          example: slang.example,
          origin: slang.origin,
        },
      });
      return term.id;
    }),
  );
  return slangTermIds;
};

const createTranslation = async (
  data: CreateTranslationBody,
  slangTerms: SlangTerm[],
) => {
  const slangTermIds = await getOrCreateSlangTermIds(slangTerms);

  const translation = await db.translation.create({
    data: {
      original: data.original,
      translated: data.translated,
      userId: data.userId,
      slangMentions: {
        create: slangTermIds.map((slangTermId) => ({
          slangTermId,
        })),
      },
    },
    include: {
      slangMentions: {
        include: {
          slangTerm: true,
        },
      },
      user: true,
    },
  });

  const { original, translated } = translation;

  return { original, translated };
};

const saveTranslation = async (id: string, userId: string) => {
  const translation = await db.translation.findUnique({
    where: { id },
    include: {
      slangMentions: {
        include: {
          slangTerm: true,
        },
      },
    },
  });

  if (!translation) {
    throw new Error("Translation not found");
  }

  const existingSavedTranslation = await db.savedTranslation.findFirst({
    where: {
      translationId: id,
      userId: userId,
    },
  });

  if (existingSavedTranslation) {
    throw new Error("Translation already saved");
  }

  const savedTranslation = await db.savedTranslation.create({
    data: {
      translationId: id,
      userId: translation.userId,
    },
  });
  return savedTranslation;
};

const deleteTranslation = async (id: string) => {
  const translation = await db.translation.findUnique({
    where: { id },
  });

  if (!translation) {
    throw new Error("Translation not found");
  }

  const savedTranslation = await db.savedTranslation.findFirst({
    where: { translationId: id },
  });

  if (savedTranslation) {
    await db.savedTranslation.delete({
      where: { id: savedTranslation.id },
    });
  }

  await db.slangMention.deleteMany({
    where: { translationId: id },
  });

  const deletedTranslation = await db.translation.delete({
    where: { id },
    include: {
      slangMentions: {
        include: {
          slangTerm: true,
        },
      },
    },
  });

  await db.slangTerm.deleteMany({
    where: {
      protected: false,
      mentions: {
        none: {},
      },
    },
  });
  return deletedTranslation;
};

const getTrendingSlang = async () => {
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const topMentions = await db.slangMention.groupBy({
    by: ["slangTermId"],
    where: {
      createdAt: {
        gte: twentyFourHoursAgo,
      },
    },
    _count: {
      slangTermId: true,
    },
    orderBy: {
      _count: {
        slangTermId: "desc",
      },
    },
    take: 5,
  });

  // const trendingIds = topMentions.map((entry) => entry.slangTermId);

  // const trendingSlangs = await db.slangTerm.findMany({
  //   where: {
  //     id: { in: trendingIds },
  //   },
  //   select: {
  //     id: true,
  //     term: true,
  //     meaning: true,
  //     example: true,
  //     origin: true,
  //   },
  // });

  // const slangMap = new Map(trendingSlangs.map((slang) => [slang.id, slang]));

  // const withCounts = topMentions
  //   .map((mention) => {
  //     const slang = slangMap.get(mention.slangTermId);
  //     return {
  //       ...slang,
  //       count: mention._count.slangTermId,
  //     };
  //   })
  //   .filter(Boolean)
  //   .sort((a, b) => b.count - a.count);

  return topMentions;
};

export {
  getTranslationById,
  getAllTranslationsByUser,
  createTranslation,
  saveTranslation,
  deleteTranslation,
  getOrCreateSlangTermIds,
  getTrendingSlang,
};
