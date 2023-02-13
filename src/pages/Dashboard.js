import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { base_address, left_col_content, tweet_share_icons } from "../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { TextareaAutosize, Tooltip } from "@mui/material";
import { TextField } from "@mui/material";
import Tweet from "../components/Tweet.component";
import FormData from 'form-data'
import { Buffer } from "buffer";

export default function Dashboard (props) {

    /* Main state for holding the user's information passed in form the login component:
     - email, str, user's email
     - token, str, JWT access token for the user
     - name, str, name of the user
     - dob, Date, user's date of birth
     - user_id, int, user's id in the database
    */ 
    const [state, setState] = useState(useLocation().state)
    
    /* 
        Array of tweets that is populated in useEffect
    */
    const [tweets, setTweets] = useState([])

    // New tweet data structure
    const [new_tweet, setNewTweet] = useState({
        //email: state.email,
        user_id: state.user_id,
        msg: "",
        sharedContent: "None",
        likes: 0,
        retweets: 0,
        datePosted: new Date(),
        originalPoster: state.user_id,
        fileKey: ""
    })

    // File info data structure to be used with sharing
    // image and GIF content
    const [file_info, setFileInfo] = useState({
        name: "None Selected",
        type: "N/A",
    })

    // Poll data structure to be used with sharing poll content
    const [poll_data, setPollData] = useState({
        question: "",
        num_answers: 0,
        choices: []
    })

    // Date data structure to be used with sharing date content
    const [date_data, setDateData] = useState(new Date())

    const [location_data, setLocationData] = useState('')

    // Helper function to generate the array of Tweet components
    // - data, arr, array of 3 elements containing tweet data,
    //   like data for the user, and retweet data for the user
    const generateTweets = (data) => {
        let tweets = data[0]
        let likes = data[1]
        let retweets = data[2]
    
        return tweets.map((tweet, index) => {
            let like_flag = false
            let retweet_flag = false
            if (likes.find(element => element.tweet_id === tweet.tweet_id) !== undefined) like_flag = true
            if (retweets.find(element => element.tweet_id === tweet.tweet_id) !== undefined) retweet_flag = true
            return {
                like_flag: like_flag,
                retweet_flag: retweet_flag,
                html: <div key={`T${tweet.tweet_id}U${tweet.user_id}`}>
                    <Tweet 
                        tweet={tweet}
                        token={state.token}
                        user_id={state.user_id}
                        like_flag={like_flag}
                        retweet_flag={retweet_flag}
                        onClickDelete={onClickDelete}
                        onClickEdit={onClickEdit}
                        onClickPollOption={onClickPollOption}
                        index={index}
                    />
                    <br></br>
                </div>
            }
        })
    }

    // UseEffect function to call api on mount to get tweets to populate the dashboard
    useEffect(() => {
        console.log("Getting Tweets...")
        axios.get(base_address + '/tweets/' + state.user_id, {
            headers: {
                authorization: "Bearer " + state.token
            }
        })
        .then(res => {
            console.log(res.data)
            let temp = generateTweets(res.data)
            let html_arr = temp.map(element => {return element.html})
            setTweets({tweets_list: res.data[0], tweets_html: generateTweets(res.data), html_arr: html_arr})
            //setTweets(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [state.email, state.token, state.user_id])

    // Function to handle haring a new tweet, uses an array of promises to handle shared content
    const onClickShare = (e) => {

        let promise_arr = []
        let req = {tweet: new_tweet}
        let sharedContent = {}
        
        if (new_tweet.sharedContent === "Image" || new_tweet.sharedContent === "GIF"){
            let data = new FormData();
            data.append('file', file_info, file_info.name)
            data.append('user_id', state.user_id)

            const url_image = base_address+'/tweets/image/add'

            const image_headers = {
                authorization: 'Bearer ' + state.token,
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`
            }

            promise_arr.push(axios.post(url_image, data, {headers: image_headers}))
            req.tweet = {...new_tweet, fileKey: `user_${state.user_id}/images/${file_info.name}`}
        }

        if (new_tweet.sharedContent === "Poll") {
            let poll = {question: poll_data.question}
            let choice_arr = []
            poll_data.choices.forEach((choice, index) => {
                poll[`c_${index+1}`] = choice
                poll[`r_${index+1}`] = 0
                choice_arr.push(poll[`c_${index+1}`])
            })
            req = {...req, sharedContent: poll}
            sharedContent = {...poll, choice_arr: choice_arr}
        }

        if (new_tweet.sharedContent === "Date") {
            req = {...req, sharedContent: date_data}
            sharedContent = {date_data: date_data.toISOString.substring(0,10)}
        }

        if (new_tweet.sharedContent === "Location") {
            req = {...req, sharedContent: location_data}
            sharedContent = {location_data: location_data}
        }

        let tweet_headers = {
            authorization: 'Bearer ' + state.token,
        }

        promise_arr.push(axios.post(base_address+'/tweets/add', req, {headers: tweet_headers}))

        console.log(req)

        Promise.all(promise_arr)
            .then(res => {
                console.log(res)
                let image = ""
                if (req.tweet.sharedContent === 'Image' || req.tweet.sharedContent === 'GIF') {
                    image = new Buffer.from(file_info.stream).toString('base64')
                }
                let prop_tweet = {...req.tweet, ...sharedContent, email: state.email, image: image}
                console.log(prop_tweet)
                setTweets({...tweets, html_arr: tweets.html_arr.concat(
                    <div key={-99}>
                        <Tweet tweet={prop_tweet} token={state.token} user_id={state.user_id}/>
                        <br></br>
                    </div>
                )})
                setNewTweet({
                    //email: state.email,
                    user_id: state.user_id,
                    msg: "",
                    sharedContent: "None",
                    likes: 0,
                    retweets: 0,
                    datePosted: new Date(),
                    originalPoster: state.user_id,
                })
            })
            .catch(err => {
                console.log(err)
            })

    }

    const onClickDelete = (e, i, id) => {
        console.log(`Deleting tweet with index ${i} and id ${id}`)
        const url = `${base_address}/tweets/delete/${id}/${state.user_id}`
        axios.delete(url, {
            headers: {
                authorization: 'Bearer ' + state.token
            }
        })
        .then(res => {
            console.log(res)
            let temp = tweets
            temp.tweets_html.splice(i, 1)
            temp.tweets_list.splice(i, 1)
            temp.html_arr.splice(i, 1)
            setTweets(temp)
        })
        .catch(err => {
            console.log(err)
        })

    }

    const onClickEdit = (e, i, id) => {
        console.log(`Editing tweet with index ${i} and id ${id}`)
    }

    const onClickPollOption = (e, i, id) => {
        const req = {content_id: id, user_id: state.user_id, choice: e.target.value}
        axios.post(base_address+'/tweets/poll', req, {
            headers:{authorization: 'Bearer ' + state.token}
        })
        .then(res => {
            console.log('Poll Counted!')
            let temp = tweets
            temp.tweets_list[i][`r_${toString(e.target.value)}`] += 1
            temp.tweets_html[i] = {
                like_flag: temp.tweets.html[i].like_flag,
                retweet_flag: temp.tweets.html[i].retweet_flag,
                html: <div key={`T${id}U${state.user_id}`}>
                    <Tweet 
                        tweet={temp.tweets_list[i]}
                        token={state.token}
                        user_id={state.user_id}
                        like_flag={temp.tweets_html[i].like_flag}
                        retweet_flag={temp.tweets_html[i].retweet_flag}
                        onClickDelete={onClickDelete}
                        onClickEdit={onClickEdit}
                        onClickPollOption={onClickPollOption}
                        index={i}
                    />
                    <br></br>
                </div>
            }
            temp.html_arr[i] = temp.tweets_html[i].html
            setTweets(temp)
        })
        .catch(err => {
            console.log(err)
        })
    }

    /*
    Java Backend
    useEffect(() => {
        console.log("Getting tweets...")
        axios.get(base_address + "/tweet/email", {
            params: {
                email: state.email
            },
            headers: {
                authorization: "Bearer " + state.access_token
            }
        })
        .then(res => {
            console.log(res)
            setTweets(res.data)
        })
    }, [state.email, state.access_token])
    
    const onClickShare = (e) => {
        const req = {
            tweet: {...new_tweet, fileKey: file_info.name},
            file: file_info
        }

        axios.post(base_address + "/tweet/add", req, {
            headers: {
                authorization: "Bearer " + state.access_token
            }
        })
        .then(res => {
            console.log("Tweet Added!")
            setTweets(tweets.concat([req.tweet]))
        })
        .catch(err => {console.log(err)})
    }
    */

    // Buttons for navigation on the left side of the dashboard
    let left_col_items =  left_col_content.map(item => {
        return <button className="dash-left-item" key={item.text}>
            <span>{item.icon}</span>
            <span className="button-font">{item.text}</span>
        </button>
    })

    // Buttons for selecting to share specific content in a tweet
    let tweet_share_items = tweet_share_icons.map(item => {
        return <Tooltip key={item.tooltip} title={<p style={{fontSize: "20px"}}>{item.tooltip}</p>}>
            <span>
                <button className="share-content-icon" onClick={e => {
                    if (new_tweet.sharedContent === item.tooltip.substring(6)){
                        setNewTweet({...new_tweet, sharedContent: "None"})
                    }
                    else {
                        setNewTweet({...new_tweet, sharedContent: item.tooltip.substring(6)})
                    }
                }}>
                    {item.icon}
                </button>
            </span>
        </Tooltip>
    })

    // Initalize file variables for image/GIF shared content to show a preview of the image
    let file_upload
    let pic_preview
    if (file_info.name !== "None Selected") pic_preview = <img src={URL.createObjectURL(file_info)} alt="" style={{maxHeight: "300px", maxWidth: "300px"}}/>

    // New tweet's share image/GIF content
    if (new_tweet.sharedContent === "Image" || new_tweet.sharedContent === "GIF"){
        file_upload = <div className="file-upload">
            <p>Chosen file: {file_info.name}</p>
            <p>File type: {file_info.type}</p>
            <br></br>
            <p>Please upload an {new_tweet.sharedContent} file below:</p>
            <input type="file" onChange={e => {setFileInfo(e.target.files[0])}} accept={
                new_tweet.sharedContent === "Image" ? ".jpg, .png" : ".gif"
            }/>
            <div>{pic_preview}</div>
        </div>
    }

    // New tweet's share poll content
    else if (new_tweet.sharedContent === "Poll") {

        let answer_inputs = poll_data.choices.map((element, index) => {

            let temp_choices = poll_data.choices

            return <div key={index}>
                <p className="file-upload-inline-text">Choice {index+1}: </p>
                <input 
                    type={"text"}
                    onChange={e => {
                        temp_choices[index] = e.target.value
                        setPollData({...poll_data, choices: temp_choices})
                    }}
                    className='file-upload-input'
                    style={{width: '400px'}}
                />
            </div>
        })

        file_upload = <div className="file-upload">
            <div>
                <p className="file-upload-inline-text">Please enter the question: </p>
                <input 
                    type={"text"}
                    onChange={e => {setPollData({...poll_data, question: e.target.value})}}
                    className='file-upload-input'
                    style={{width: '400px'}}
                />
            </div>
            <div>
                <p className="file-upload-inline-text">How many choices: </p>
                <select 
                    onChange={e => {setPollData({...poll_data, num_answers: parseInt(e.target.value), choices: Array(parseInt(e.target.value)).fill(0)})}}
                    defaultValue={0}
                    className='file-upload-input'
                >
                    <option disabled value={0}>Test</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                </select>
            </div>
            <div style={{marginBottom: '40px'}}>
                {answer_inputs}
            </div>
        </div>
    }

    // render elements
    return <div className="dashboard">
        <div className="dashboard-icon">
            <FontAwesomeIcon icon={faGlobe} size='4x'/>
        </div>
        <div className="dash-left-col">
            {left_col_items}
        </div>
        <div className="dash-middle-col">
            <TextareaAutosize 
                aria-label="New Tweet Field"
                minRows={10}
                style={{width: "100%"}}
                onChange={e => {setNewTweet({...new_tweet, msg: e.target.value})}}

            />
            <br />
            {file_upload}
            <div>
                {tweet_share_items}
                <span className="share-tweet-btn">
                    <button className="landing-page-button button-font" onClick={onClickShare}>
                        Share
                    </button>
                </span>
            </div>
            <div style={{marginBottom: "90px"}}></div>
            <div>
                {
                    tweets.html_arr
                }
            </div>
        </div>
        <div className="dash-right-col">
            <TextField 
                label="Search"
            />
        </div>
    </div>

}


