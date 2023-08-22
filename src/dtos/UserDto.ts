class UserDto {
    name;
    email;
    phoneNumber;
    id;
    isActivated;
    activationLink;

    constructor(model: any) {
        this.name = model.name;
        this.email = model.email;
        this.phoneNumber = model.phoneNumber;
        this.id = model._id;
        this.isActivated = model.isActivated
        this.activationLink = model.activationLink
    }
}

export default UserDto;