import { View, Image } from "tamagui"
import { Dimensions } from "react-native"

interface CoverImageProps {
    item: {
        cover: boolean | any,
        id: string,
    },
    /** 
    * @property Defaults to 10
    */
    borderRadius?: number,
    /** 
    * @property Defaults to 100
    */
    height?: number;
}

export default function CoverImage(props: CoverImageProps) {
    const { item, borderRadius = 10, height = 100 } = props;
    const screenWidth = Dimensions.get("screen").width
    let imageHeight = height
    if (screenWidth >= 700) {
        imageHeight = 200;
    }

    return <>{item ? (<>{
        item.cover ?
            <Image height={imageHeight} source={{
                uri: `https://eslrohuhvzvuxvueuziv.supabase.co/storage/v1/object/public/covers/${item.id}.jpg`,
            }
            } borderRadius={borderRadius} >

            </Image >
            :
            null
        // <View height={100} backgroundColor={'$main4'} borderRadius={10}>

        // </View>
    }</>) : null}</>
}