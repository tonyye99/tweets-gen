export const useTweetStore = defineStore("tweet", {
  state: () => ({
    tweet: 'We can only see a short distance ahead, but we can see plenty there that needs to be done. - Alan Turing',
    thread: "",
    loading: false,
    contentType: "tweet" as "tweet" | "thread",
    model: {
      topic: null,
      mood: "professional",
      isEmoji: "with no Emojis",
      isHashTags: "and with no HashTags",
    },
    size: "medium" as "small" | "medium" | "large",
    topicPlaceHolders: [
      "Hollywood movies that are based on true stories",
      "five soft skills that are important for a job",
      "the best way to learn a new language",
      "Elon Musk plans to colonize Mars",
    ],
    rules: {
      topic: [
        {
          required: true,
          trigger: ["blur", "input"],
          message: "Topic is required",
        },
      ],
    },
    toneOptions: [
      { label: "Professional", value: "professional" },
      { label: "Funny", value: "funny" },
      { label: "Serious", value: "serious" },
      { label: "Informative", value: "informative" },
      { label: "Inspiring", value: "inspiring" },
      { label: "Motivational", value: "motivational" },
      { label: "Educational", value: "educational" },
      { label: "Entertaining", value: "entertaining" },
      { label: "Creative", value: "creative" },
      { label: "Thoughtful", value: "thoughtful" },
    ],
    messages: [] as any[],
  }),
  getters: {
    systemContent(): string {
      if (this.contentType === "tweet") {
        return `Act as a content creator on Twitter. Your task is to write a tweet. Your tweet should be engaging and thought-provoking.`;
      }
      return `Act as a content creator on Twitter. Your task is to generate a thread starter. Your thread should be engaging and thought-provoking.`;
    },
    userContent(): string {
      if (this.contentType === "tweet") {
        return `Write another ${this.model.mood} trending tweet about ${this.model.topic} ${this.model.isEmoji} ${this.model.isHashTags}. The tweet should include lists with line breaks and a short intro but do not include more than 110 characters.`;
      }
      return `Write another tweet to start a ${this.model.mood} trending thread about ${this.model.topic} ${this.model.isEmoji} ${this.model.isHashTags}. At the end of tweet one of the 🧵 or 👇 emoji should be included. `;
    },
    randomPlaceholder(): string {
      return this.topicPlaceHolders[
        Math.floor(Math.random() * this.topicPlaceHolders.length)
      ];
    },
    formattedTweet(): string {
      const formattedTweet = this.tweet
        .replace(/"/g, "")
        .replace(/(\r\n|\n|\r)/gm, "<br>");
      // if (!this.model.isHashTags) {
      //   return formattedTweet.replace(/#(\w+)/g, "");
      // }
      return formattedTweet;
    },
  },
  actions: {
    setTweet(content: string) {
      this.tweet = content;
    },
    setThread(content: string) {
      this.thread = content;
    },
    setLoading(value: boolean) {
      this.loading = value;
    },
    addMessage(message: { role: string; content: string }) {
      this.messages.push(message);
    },
    setMessage(messages: any[]) {
      this.messages = messages;
    },
    removeLastMessage() {
      this.messages.pop();
    },
    removeAllMessages() {
      this.messages = [];
    },
  },
});
