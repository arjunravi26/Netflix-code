import axios from '../../axios'
import './Rowpost.css'
import React, { useEffect, useState } from 'react'
import { imageurl, APL_KEY } from '../../const/const';
import Youtube from 'react-youtube'

function Rowpost(props) {
  const [i, setI] = useState()
  const [rowMovie, setRowMovie] = useState()
  const [urlId, setUrlId] = useState()
  const [vid, setVidPhoto] = useState(false)

  useEffect(() => {
    axios.get(props.url).then((response) => {
      setRowMovie(response.data.results)
    })
  },);
  const opts = {
    width: "205px",
    playerVars: {
      autoplay: 1
    },
  };
  const mouseout = () => {
    setVidPhoto(false)
  }
  const handleMovieClick = (id, index) => {
    setI(index)
    setVidPhoto(true)
    axios.get(props.url).then((response) => {
      // console.log(response.data.results[index])
      console.log(vid)

    })
    if (props.vid) {
      axios.get(`/movie/${id}/videos?api_key=${APL_KEY}&language=en-US`).then(response => {
        if (response.data.results !== 0) {
          setUrlId(response.data.results[0])
          console.log(vid)


          //console.log(response.data)


        } else {
          alert("Video Not Available")
        }
      })
    }
    else if (props.ser) {
      axios.get(`/tv/${id}/season/1/videos?api_key=${APL_KEY}&language=en-US`).then(response => {
        if (response.data.results !== 0) {
          setUrlId(response.data.results[0])
          // console.log(response.data.results[0])

        }

      })

    }
  }

  return (
    <div className='row'>
      <h2>{props.title}</h2>
      <div className='posters'>
        {
          rowMovie ? rowMovie.map((obj, index) =>
            <div style={{ left: (index * 80) }} onClick={() => handleMovieClick(obj.id, index)} onMouseOut={mouseout}>
              {
                vid && i === index ?
                  <div>
                    {
                      urlId ?
                        <div className='video'>
                          <Youtube className='poster' opts={opts} videoId={urlId.key}></Youtube>
                        </div> : <div className='video'>
                          <h3 className='poster' id='error'>"No video  Available"</h3>
                        </div>

                    }
                  </div> : <img className='poster' src={`${obj ? imageurl + obj.poster_path : " "}`} alt="none" />
              }

            </div>
          ) : null
        }
      </div>
    </div>
  )
}

export default Rowpost
