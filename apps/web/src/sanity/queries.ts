import groq from 'groq'
import {sanity} from './client'

export type ClassItem = {
  _id: string
  title: string
  slug: {current: string}
  summary?: string
  difficulty?: 'Beginner'|'Intermediate'|'Advanced'
  category?: '1:1'|'Group'|'Online'
  duration?: string
  basePrice?: number
  coverImage?: any
}

export type SessionItem = {
  _id: string
  start: string
  end: string
  capacity: number
  status: 'scheduled'|'cancelled'|'full'
  location?: string
}

export const getClassesQ = groq`*[_type=="class"]|order(title asc){
  _id, title, slug, summary, difficulty, category, duration, basePrice, coverImage
}`

export const getClassBySlugQ = groq`*[_type=="class" && slug.current==$slug][0]{
  _id, title, slug, summary, difficulty, category, duration, basePrice, coverImage,
  "sessions": *[_type=="session" && references(^._id) && start > now()]|order(start asc){
    _id, start, end, capacity, status, location
  }
}`

export const getAthleteQ = groq`*[_type=="athlete"][0]{name, bio, achievements[]{year,title}, heroImage}`

export async function getClasses() {
  return sanity.fetch<ClassItem[]>(getClassesQ)
}
export async function getClassBySlug(slug: string) {
  return sanity.fetch<{[k:string]: any}>(getClassBySlugQ, {slug})
}
export async function getAthlete() {
  return sanity.fetch<{[k:string]: any}>(getAthleteQ)
}
