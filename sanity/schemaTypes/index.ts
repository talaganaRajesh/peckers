import { type SchemaTypeDefinition } from 'sanity'
import category from './category'
import homepage from './homepage'
import location from './location'
import sliderCard from './sliderCard'
import homepagePersonDetails from './homepagePersonDetails'
import footer from './footer'
import menupage from './menupage'
import ourstorypage from './ourstorypage'
import ourstorybottompage from './ourstorybottompage'
import siteSettings from './siteSettings'
import locationPage from './locationPage'
import mapSection from './mapSection'
import reviewsHomepage from './reviewsHomepage'
import enquireSection from './enquireSection'
import sauces from './sauces'
import saucepage from './saucepage'
import uniquenessLanding from './uniquenessLanding'
import uniquenessSubsection from './uniquenessSubsection'
import timeline from './timeline'
import locationHistory from './locationHistory'
import menuNavbar from './menuNavbar'
import crewpage from './crewpage'
import wrapspage from './wrapspage'
import ricebowlspage from './ricebowlspage'
import saladbowlspage from './saladbowlspage'
import wingsandtenderspage from './wingsandtenderspage'
import periperigrillpage from './periperigrillpage'
import whatsnewpage from './whatsnewpage'
import shakespage from './shakespage'
import vegpage from './vegpage'
import sidesandfriespage from './sidesandfriespage'
import mealboxpage from './mealboxpage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    category, homepage, location, sliderCard, homepagePersonDetails, footer, 
    menupage, ourstorypage, timeline, ourstorybottompage, siteSettings, 
    locationPage, mapSection, reviewsHomepage, enquireSection, sauces, 
    saucepage, uniquenessLanding, uniquenessSubsection, locationHistory, 
    menuNavbar, crewpage, wrapspage, ricebowlspage, saladbowlspage, 
    wingsandtenderspage, periperigrillpage, whatsnewpage, shakespage, 
    vegpage, sidesandfriespage, mealboxpage
  ],
}

