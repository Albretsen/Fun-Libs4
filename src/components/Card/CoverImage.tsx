import { View, Image } from "tamagui"

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

    return <>{item ? (<>{
        item.cover ?
            <Image height={height} source={{
                uri: `https://eslrohuhvzvuxvueuziv.supabase.co/storage/v1/object/public/covers/${item.id}.png`,
            }
            } borderRadius={borderRadius} >

            </Image >
            :
            <View height={100} backgroundColor={'$main4'} borderRadius={10}>

            </View>
    }</>) : null}</>
}