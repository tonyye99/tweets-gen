export const useTweetStore = defineStore("tweet", {
  state: () => ({
    tweet: `“Contemplating the order of the universe, one cannot help but wonder about the forces that govern it. What do you think keeps it all in balance?”`,
    thread: "",
    loading: false,
    contentType: "tweet" as "tweet" | "thread",
    model: {
      topic: null,
      mood: "professional",
      isEmoji: false,
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
        return `Act as a professional content creator on Twitter. Your task is to write a tweet about a current event or topic of your choice. Your tweet should be no more than 150 characters, and it should be engaging and thought-provoking.`;
      }
      return `Act as a professional content creator on Twitter. Your task is to generate a thread about a current event or topic of your choice. Your thread should be engaging and thought-provoking.`;
    },
    userContent(): string {
      if (this.contentType === "tweet") {
        return `Write another ${this.model.mood} tweet about ${this.model.topic}
        ${this.model.isEmoji ? "and with emoji" : "and with no emoji"}`;
      }
      return `Write another list of five ideas about ${this.model.topic} in a ${this.model.mood} tone. Each idea should not be longer than 150 characters.`;
    },
    randomPlaceholder(): string {
      return this.topicPlaceHolders[
        Math.floor(Math.random() * this.topicPlaceHolders.length)
      ];
    },
    formattedThread(): string[] {
      return this.thread.split("\n");
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
    }
  },
});
