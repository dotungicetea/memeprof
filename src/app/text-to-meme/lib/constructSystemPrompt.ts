const constructSystemPrompt = (userTextInput: string) => {
  const systemPrompt = `Generate a funny and original meme text not cliche and short for the theme "${userTextInput}". also not include any hashtags like #schoollife, meme text is enough.  no need instructions to explain the meme., keep it simple and short.`;

  return systemPrompt;
};

export { constructSystemPrompt };
