export const useTweetStore = defineStore("tweet", {
  state: () => ({
    tweet:
      "We can only see a short distance ahead, but we can see plenty there that needs to be done. - Alan Turing",
    thread: [] as any[],
    tempTweet: "",
    loading: false,
    contentType: "tweet" as "tweet" | "thread",
    model: {
      topic: null,
      mood: "",
      isEmoji: "with no emoticons",
      isHashTags: "and with no HashTags",
      onlyHook: false,
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
      { label: "Neutral", value: "" },
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
    userContent(): string {
      if (this.contentType === "thread") {
        if (this.model.onlyHook) {
          return `Write another thread hook about ${this.model.mood} thread about ${this.model.topic} ${this.model.isEmoji} ${this.model.isHashTags}..`
        }
        return `Write another ${this.model.mood} thread about ${this.model.topic} ${this.model.isEmoji} ${this.model.isHashTags}. Each tweet should have at least 210 characters and should not exceed 230 characters in length. Each Tweet should be separated by "END\n\n".`;
      }
      return `Write another ${this.model.mood} tweet about ${this.model.topic} ${this.model.isEmoji} ${this.model.isHashTags}. Write less than 270 characters.`;
    },
    randomPlaceholder(): string {
      return this.topicPlaceHolders[
        Math.floor(Math.random() * this.topicPlaceHolders.length)
      ];
    },
    modelInstructions(): any[] {
      if (this.contentType === "thread") {
        if (this.model.onlyHook) {
          return [
            {
              role: "system",
              content:
                "Act as if you're a social media expert. Give me a thread hook about Javascript. The thread hook should be optimised for virality and contain hashtags and emoticons. The thread hook should not exceed 280 characters in length.",
            },
            {
              role: "assistant",
              content:
                "Spread Operators in JavaScript.\n\nThe Beginner's Guide.\n\nThread:",
            },
            {
              role: "user",
              content: "Write another thread hook about Movies for programmer.",
            },
            {
              role: "assistant",
              content: "9 Must-watch Movies for programmer:",
            },
            {
              role: "user",
              content: "Write another thread hook about Movies for programmer.",
            },
            {
              role: "assistant",
              content: "9 Must-watch Movies for programmer:",
            },
            {
              role: "user",
              content: "Write another thread hook about HTML Forms.",
            },
            {
              role: "assistant",
              content:
                "There are 22 types of input elements that can be used in HTML forms.\n\nHere they are:🧵",
            },
          ];
        }
        return [
          {
            role: "system",
            content:
              "Act as if you're a social media expert. Give me a 10 tweet thread about Useful websites for developers. The thread should be optimised for virality and contain hashtags and emoticons. Each tweet should have at least 250 characters and should not exceed 280 characters in length. Thread hook should be engaging. Each Tweet should be separated by END word.",
          },
          {
            role: "assistant",
            content:
              "Useful websites for web developers. 🧵 END 1-> Dev Resources\n\nA collection of resources for developers. Learn programming, UI inspiration, job boards, images, icons, and much more. END 2-> Pulsetic\n\nGet website downtime alerts by SMS, phone call, Slack, Telegram, or email.END 3-> Free Admin Dashboard Templates\nSpeed up your development workflow with free admin panel templates that are highly customizable. END 4-> BrandBird\nBrandBird is a powerful yet dead-simple-to-use image editor for product graphics & quick social media posts.END 5-> Codewell\nImprove your HTML and CSS skills by practicing on real design templates. END If you liked this thread, share it with your friends",
          },
          {
            role: "user",
            content:
              "Write another thread about CSS Libraries. Each tweet should have at least 250 characters and should not exceed 280 characters in length.",
          },
          {
            role: "assistant",
            content:
              "Top 10 CSS libraries for your next app! \n\nA thread 🧵 👇 END CSS Libraries are essential tools that can help developers build better, faster, and more attractive web projects. With so many libraries available, it can be challenging to know where to start. \n\nIn this post, we’ll take a look at the top 10 CSS libraries for your next app! END 1. Bootstrap:\n\nBootstrap is one of the most popular CSS libraries out there.\n\nIt’s easy to use, customizable and has lots of features that make it a go-to choice.\n\nIt’s an ideal library for responsive web design and offers a variety of pre-built UI components. END 2. Bulma:\n\nBulma is a modern CSS framework that’s lightweight and easy to use.\n\nIt comes with a lot of built-in classes and features that allow the easy creation of responsive web pages.\n\nIt doesn’t rely on JavaScript, so the web pages load a lot faster. END 3. Materialize:\n\nMaterialize is a CSS library based on Google’s Material Design.\n\nIt offers pre-built components such as buttons, forms, and cards.\n\nMaterialize is easy to use and provides extensive documentation to make development faster. END 4. Foundation:\n\nFoundation is a powerful front-end framework that provides a wide range of customizable UI components.\n\nIt’s an excellent choice for responsive web design, and it’s highly adaptable, making it a perfect fit for both small and large projects. END 5. Semantic UI:\n\nIt is an intuitive CSS library that helps developers build responsive & visually appealing web pages quickly. \n\nIt provides many pre-built classes and elements that make it easy to create complex layouts. \n\nIt is highly customizable and has great docs. END 6. Tailwind CSS:\n\nThis is arguable one of the most famous ones out there!\n\nTailwind CSS is a highly customizable CSS framework that provides low-level utility classes to help you build custom designs. \n\nIt’s highly efficient and can help you build websites quickly. END 7. Tachyons:\n\nIt is a functional CSS library that provides pre-built classes to help you create fast-loading and responsive websites.\n\nIt’s highly customizable and provides a unique approach to CSS styling. END 8. SpectreCSS:\n\nIt is a lightweight and responsive CSS library that provides a range of pre-built classes to help you build clean and modern web designs. \n\nIt’s highly customizable and easy to use, making it a perfect fit for both small and large projects. END 9. Pure:\n\nPure is a minimalist CSS library that provides CSS classes and components to help you create clean and fast-loading web pages.\n\nIt’s easy to use and doesn’t require any JavaScript, making it an excellent choice for projects that require high performance. END 10. Milligram:\n\nIt is a minimalist CSS framework that provides a set of lightweight CSS classes to help you create fast-loading & responsive apps.\n\nIt’s very customizable & easy to use & is a great option for developers who want a simple and fast way to build web pages. END That's a wrap!\nHey, I write two threads every day on web dev and it takes a lot of time and effort.\nSo, I'd be glad if you could spare me a minute to:\n\n✅ Follow me for more of these.\n✅ RT the tweet below to show me some love.",
          },
        ];
      }
      return [
        {
          role: "system",
          content:
            "Act as if you're a social media expert. Give me a tweet about Exercise for belly fat. The tweet should be optimised for virality. The tweet should have at least more than 250 characters in length and should not exceed 280 characters in length.",
        },
        {
          role: "assistant",
          content:
            "A simple formula to lose belly fat\n\n· Get 8 hours of sleep\n· Walk 10k steps daily\n· Drink primarily water\n· Lift weights 3x a week\n· Eat single ingredient nutrient dense foods in a caloric deficit\n\nDo this for 90 days straight and watch your waistline start to disappear.",
        },
        {
          role: "user",
          content:
            "Perfect! Write another tweet about Web development career path.",
        },
        {
          role: "assistant",
          content:
            "Take your web development to the next level with these frameworks:\n\n- Tailwind CSS\n- NextJS\n- NuxtJS\n- Laravel\n- Django\n- Ruby on Rails\n- Express\n- Symphony\n- NestJS",
        },
        {
          role: "user",
          content: "Great. Write another tweet about Web Development Roadmap.",
        },
        {
          role: "assistant",
          content:
            "The roadmap I wish I'd known: \n\n✅ Learn HTML \n✅ Learn CSS \n✅ Build projects \n✅ Learn Javascript \n✅ Build project \n✅ Feel worthless \n✅ Learn Git Github \n✅ Learn React \n✅ Build complex projects (melts brain) \n🚀 Open source to stand out ✅ Get a job!\n",
        },
        {
          role: "user",
          content: "Great. Write another tweet about Follower growth.",
        },
        {
          role: "assistant",
          content:
            "If you're a creator with less than 1,000 followers, Introduce yourself below and link to your favourite product Let's help you grow!\n",
        },
        {
          role: "user",
          content: "Great. Write another tweet about Software Engineering.",
        },
        {
          role: "assistant",
          content:
            "How to Increase Your Luck as a Software Engineer: \n\nStart a blog \nBuild projects \nDo open-source \nBuild in public \nWrite in public \nDevelop soft skills \nJoin an engaged community \nShare more & compare less \nSend cold emails or DMs  \nNetwork, Network, Network",
        },
        {
          role: "user",
          content: "Great. Write another tweet about Enterpreneur Leadership.",
        },
        {
          role: "assistant",
          content:
            "Many Solopreneurs fail because they are impatient.\n\nThere are zero get-rich-quick schemes that work.\n\nIf someone is selling you that and you're buying? You're the fool.\n\nBuilding something great takes a long time, so please approach it with that mindset.",
        },
        {
          role: "user",
          content:
            "Great. Write another tweet about 5 books for Morning routines.",
        },
        {
          role: "assistant",
          content:
            "I've been doing cold showers in the morning for over 30 days straight. An underrated benefit I'm experiencing is increased alertness & better mood. This is likely due to the release of dopamine and norepinephrine. It's like taking a drug that causes you to feel better.\n",
        },
        {
          role: "user",
          content:
            "Great. Write another tweet about 10 things to keep reminding yourself.",
        },
        {
          role: "assistant",
          content:
            "10 things to keep reminding yourself:\n\n1. You may fail\n2. Keep Moving\n3. Make mistakes\n4. Focus on what you do have\n5. Success is journey, not destination\n6. Some days will be bad\n7. Let go of expectations\n8. The future is bright\n9. Believe in yourself\n10. Do your best",
        },
        {
          role: "user",
          content: "Great. Write another tweet about Remote websites.",
        },
        {
          role: "assistant",
          content:
            "Websites to find remote jobs:\n\n⧩ Hired\n⧩ FlexJobs\n⧩ Wellfound\n⧩ Jobspresso\n⧩ Remote OK\n⧩ JustRemote\n⧩ JS Remotely\n⧩ DailyRemote\n⧩ Remote Leaf\n⧩ Remote Work\n⧩ RemoteLeads\n⧩ We Work Remotely",
        },
        {
          role: "user",
          content:
            "Great. Write another tweet about Mark Zuckerberg with emoticons and with no HashTags.",
        },
        {
          role: "assistant",
          content:
            "Mark Zuckerberg created a platform that connects people from all over the world 🌐. He's revolutionized the way we communicate and share information. 🚀",
        },
      ];
    },
  },
  actions: {
    setThread(content: string) {
      const hook = content?.split("END\n\n")[0];
      const thread = content?.split("END\n\n").slice(1);
      this.tweet = hook;
      this.thread = thread;
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
    removeAllMessages() {
      this.messages = [];
    },
    streamTweet(content: string) {
      this.tweet += content;
    },
    streamThread(content: string) {
      this.tempTweet += content;
      this.setThread(this.tempTweet);
    },
    removeTweet() {
      this.tweet = "";
      this.tempTweet = "";
      this.thread = [];
    }
  },
});
