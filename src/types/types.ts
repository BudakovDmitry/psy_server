import { Document, Types } from 'mongoose'

export type UserType = {
  id: string
  name: string
  email: string
  phoneNumber: string
  password: string
  avatar: string
  isActivated: boolean
  isActive: boolean
  activationLink: string
  roles: string[]
  diarySuccess: DiarySuccessType[]
};

export type DiarySuccessType = {
  title: string
  description: string
  date: string
}

export interface MessageInterface {
  sender: Types.ObjectId; // ID користувача, який відправив повідомлення
  content: string; // Текст повідомлення
  timestamp: Date; // Дата та час відправлення
  _id: string;
}

export interface ChatInterface extends Document {
  name: string; // Назва чату
  participants: Types.ObjectId[]; // Масив ID користувачів, які приймають участь у чаті
  messages: MessageInterface[]; // Масив повідомлень у чаті
}

