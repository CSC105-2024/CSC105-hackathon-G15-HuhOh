export interface CreateUserBody {
  username: string;
  email: string;
  password: string;
}
export interface CreateTranslationBody {
  original: string;
  translated: string;
  userId: string;
}

export interface CreateDemoTranslationBody {
  original: string;
  translated: string;
}

export interface SlangTerm {
  term: string;
  meaning: string;
  example: string;
}
