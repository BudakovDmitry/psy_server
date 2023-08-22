export type UserType = {
  id: string
  name: string
  email: string
  phoneNumber: string
  password: string
  avatar: string
  isActivated: boolean
  activationLink: string
  roles: string[]
  diarySuccess: DiarySuccessType[]
};

export type DiarySuccessType = {
  title: string
  description: string
  date: string
}
