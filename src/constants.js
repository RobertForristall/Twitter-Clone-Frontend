import moment from "moment"
import { range } from "./functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faHashtag, faBell, faEnvelope, faBookmark, faList, faPerson, faEllipsis } from "@fortawesome/free-solid-svg-icons"
import { faImage, faPoll, faCalendar, faMapLocation } from "@fortawesome/free-solid-svg-icons";


moment.locale('en')

const current_year = new Date().getFullYear()

// JS
//export const base_address = 'http://localhost:5000'

// Java
export const base_address = 'http://localhost:8080/api/v1'

export const months = moment.monthsShort()
export const max_days = [
    31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
]
export const years = range(current_year-120 , current_year).reverse()

export const check_list_text = [
    'Contains an uppercase character',
    'Contains a lowercase character',
    'Contains a number',
    'Contains a special character',
    'Minimum length of 8'
]

export const left_col_content = [
    {
        icon: <FontAwesomeIcon icon={faHouse} size="2x"/>,
        text: "Home"
    },
    {
        icon: <FontAwesomeIcon icon={faHashtag} size="2x"/>,
        text: "Explore"
    },
    {
        icon: <FontAwesomeIcon icon={faBell} size="2x"/>,
        text: "Notifications"
    },
    {
        icon: <FontAwesomeIcon icon={faEnvelope} size="2x"/>,
        text: "Messages"
    },
    {
        icon: <FontAwesomeIcon icon={faBookmark} size="2x"/>,
        text: "Bookmarks"
    },
    {
        icon: <FontAwesomeIcon icon={faList} size="2x"/>,
        text: "Lists"
    },
    {
        icon: <FontAwesomeIcon icon={faPerson} size="2x"/>,
        text: "Profile"
    },
    {
        icon: <FontAwesomeIcon icon={faEllipsis} size="2x"/>,
        text: "More"
    },
]

export const tweet_share_icons = [
    {
        icon: <FontAwesomeIcon icon={faImage} size='3x'/>,
        tooltip: "Share Image",
    },
    {
        icon: <FontAwesomeIcon icon={faImage} size='3x'/>,
        tooltip: "Share GIF"
    },
    {
        icon: <FontAwesomeIcon icon={faPoll} size='3x'/>,
        tooltip: "Start Poll"
    },
    {
        icon: <FontAwesomeIcon icon={faCalendar} size='3x'/>,
        tooltip: "Share Date"
    },
    {
        icon: <FontAwesomeIcon icon={faMapLocation} size='3x'/>,
        tooltip: "Share Location"
    },
]