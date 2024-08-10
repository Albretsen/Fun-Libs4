import { Image } from "tamagui"

interface ProfilePictureProps {
    /** 
    * @property Size: The height and width of the picture, which have to be the same number
    * Defaults to 48
    */
    size?: number,
    avatarURL?: string,
}

export default function ProfilePicture(props: ProfilePictureProps) {
    const { size = 48, avatarURL } = props;
    return (
        <Image height={size} width={size} backgroundColor={'$main6'} objectFit="contain" source={{
            uri: avatarURL ? avatarURL : 'https://eslrohuhvzvuxvueuziv.supabase.co/storage/v1/object/public/avatars/no-avatar.png',
        }} borderRadius={1000}></Image>
    )
}