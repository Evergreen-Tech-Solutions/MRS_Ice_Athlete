import imageUrlBuilder from '@sanity/image-url'
import {sanity} from './client'

const builder = imageUrlBuilder(sanity)
export const urlFor = (source: any) => builder.image(source)
