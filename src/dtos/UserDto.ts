class UserDto {
    name;
    email;
    phoneNumber;
    id;
    isActivated;
    activationLink;
    registrationDate;

    constructor(model: any) {
        this.name = model.name;
        this.email = model.email;
        this.phoneNumber = model.phoneNumber;
        this.id = model._id;
        this.isActivated = model.isActivated
        this.activationLink = model.activationLink
        this.registrationDate = model.registrationDate
    }
}

export default UserDto;