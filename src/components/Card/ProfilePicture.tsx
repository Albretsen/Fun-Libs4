import { Image } from "tamagui"

interface ProfilePictureProps {
    /** 
    * @property Size: The height and width of the picture, which have to be the same number
    * Defaults to 48
    */
    size?: number,
    avatarId: string,
}

export default function ProfilePicture(props: ProfilePictureProps) {
    const { size = 48, avatarId } = props;
    return (
        <Image height={size} width={size} backgroundColor={'$main6'} objectFit="contain" source={{
            uri: avatarId ? avatarId : 'https://eslrohuhvzvuxvueuziv.supabase.co/storage/v1/object/public/avatars/no-avatar.png',
        }} borderRadius={1000}></Image>
    )
}