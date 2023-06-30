export const mountBodyUserUpdate = (
    public_name?: string,
    instagram?: string,
    facebook?: string,
    telegram?: string
) => {

    return {
        public_name: public_name,
        instagram: instagram,
        facebook: facebook,
        telegram: telegram,
    }

}