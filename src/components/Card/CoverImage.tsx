import { View, Image } from "tamagui"

export default function CoverImage(props: any) {
    const { item } = props;

    return (<>{
        item.cover ?
            <Image height={100} source={{
                uri: `https://eslrohuhvzvuxvueuziv.supabase.co/storage/v1/object/public/covers/${item.id}.png`,
            }
            } borderRadius={10} >

            </Image >
            :
            <View height={100} backgroundColor={'$main4'} borderRadius={10}>

            </View>
    }</>)
}