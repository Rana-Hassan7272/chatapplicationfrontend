// Sample chat data
export const ChatSampleData = [
  {
    name: "Joe Biden",
    _id: "1",
    groupChat: false,
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    members: ["1", "2"]
  },
  {
    name: "Hassan",
    _id: "2",
    groupChat: false,
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    members: ["1", "2"]
  }
];

// User data
export const UserData = [
  {
    name: "Joe Biden",
    _id: "1",
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"]
  },
  {
    name: "Hassan",
    _id: "2",
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"]
  }
];

// Notification data
export const NotificationData = [
  {
    sender: {
      name: "Joe Biden",
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"]
    },
    _id: "1"
  },
  {
    sender: {
      name: "Hassan",
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"]
    },
    _id: "2"
  }
];

// Sample message data
export const SampleMessage = [
  {
    attachments: [
      { publicId: "adsjadhjd" },
      { url: "https://www.w3schools.com/howto/img_avatar.png" }
    ],
    content: "Hassan is good",
    _id: "adadad",
    sender: {
      _id: "user._id",
      name: "Hassan"
    },
    chat: "chatId",
    createdAt: "Fri Apr 05 2024 05:00:00 GMT+0500 (Pakistan Standard Time)"
  }
];

export const userManagementData = {
  users: [
    {
      name: "Joe Biden",
      _id: 1,
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      friends: '3',
      groups: '4',
      email: 'ssc.shahbaz.222@gmail.com',
      username: 'RanaSaab302'
    },
    {
      name: "Hassan",
      _id: 2,
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      friends: '2',
      groups: '4',
      email: 'ssc.hassan.222@gmail.com',
      username: 'Rbrs3342'
    },
    {
      name: "Another User",
      _id: 3,
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      friends: '5',
      groups: '8',
      email: 'hassandeveloper22@gmail.com',
      username: 'RanaHassab7171'
    }
  ],
  messages: [
    {
      _id: 2,
      content: 'Hassan developing chat app',
      createdAt: "Fri Apr 05 2024 05:00:00 GMT+0500 (Pakistan Standard Time)",
      attachments: [{
        publicId: "ahjddhahkdk",
        url: "https://www.w3schools.com/howto/img_avatar.png"
      }],
      sender: {
        name: "Hassan",
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"]
      },
      groupChat: false,
      chat: "chatId"
    },
    {
      _id: 7,
      content: 'Hassan developing frontend',
      createdAt: "Fri Apr 05 2024 05:00:00 GMT+0500 (Pakistan Standard Time)",
      attachments: [],
      sender: {
        name: "Ahmed",
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"]
      },
      groupChat: true,
      chat: "chatId"
    }
  ],
  chats: [
    {
      _id: "kjaaaaaa",
      name: "John Doe",
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      members: [
        {
          _id: '1',
          avatar: ["https://www.w3schools.com/howto/img_avatar.png"]
        },
        {
          _id: '2',
          avatar: ["https://www.w3schools.com/howto/img_avatar.png"]
        }
      ],
      groupChat: false,
      totalMembers: 3,
      totalMessages: 33,
      creator: {
        name: "Hassan",
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"]
      },
      groups: 3
    },
    {
      _id: "kjaaaddaaa",
      name: "Dale Steyn",
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      members: [
        {
          _id: '1',
          avatar: ["https://www.w3schools.com/howto/img_avatar.png"]
        },
        {
          _id: '2',
          avatar: ["https://www.w3schools.com/howto/img_avatar.png"]
        }
      ],
      groupChat: true,
      totalMembers: 2,
      totalMessages: 43,
      creator: {
        name: "Hanan",
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"]
      },
      groups: 3
    }
  ]
};
