import  { connectToDatabase } from '../../util/mongodb'
import { getStoryById } from '../../db/stories';
import { useCurrentUser } from "../../hooks/user";
import { Polly } from "@aws-sdk/client-polly";
import { getSynthesizeSpeechUrl } from "@aws-sdk/polly-request-presigner";
import Link from 'next/link'
import AudioPlayer from '../../components/AudioPlayer'


export default function Stories({ story, speechUrl }) {
    const [user] = useCurrentUser();
    console.log(speechUrl);

    return (
        <div>
            {story &&
              <div>
                  {/* Ekki komin virkni á að velja rödd */}
                <div>
                    <input type="radio" id="dora" name="voice" value="dora"/>
                    <label for="dora">Dóra</label>
                    <input type="radio" id="karl" name="voice" value="karl"/>
                    <label for="karl">Karl</label>
                </div>
                <div>
                    <AudioPlayer url={speechUrl}/>
                </div>
                <p>hello title: {story.title}</p>
                <p>hello author: {story.author}</p>
                {/* <p>hello text: {story.text}</p> */}
                <p dangerouslySetInnerHTML={{__html: story.text}}></p>
                <div>
                    genres:
                    {story.genres.map((genre) => 
                        <div key={genre}>
                            {genre}
                        </div>
                    )}
                </div>
                <div>
                    {/* Breyta þannig að réttur notandi sjái bara við sínar sögur eða færa þetta á sögur á min-sida */}
                    {!user ? '' : (
                        <Link href={`/breyta-sogu/${story._id}`}>
                            <a>Breyta sögu</a>
                        </Link>
                    )}
                </div>
              </div>
            }
        </div>
    )
}





// Það þarf að skilgreina paths hér annars rebuildast í hvert skipti ... 
export async function getStaticPaths(){
    return {
        paths: [],
        fallback: true,
    }
}


// Getting static props from MongoDB and AWS Polly TTS
export async function getStaticProps({params}) {
    // MongoBD
    const {db} = await connectToDatabase();
    const story = await getStoryById(db, params.id);

     // Connecting to Amazon Polly TTS client
     const client = new Polly({
        region: process.env.AWS_REGION_MYAPP,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID_MYAPP,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_MYAPP,
        },
    });

    // Sameina values úr story array fyrir Polly

    const speechParams = {
        OutputFormat: "mp3",
        Text: story.title,
        TextType: "text",
        VoiceId: "Dora",
    }
       
    const url = await getSynthesizeSpeechUrl({
        client,
        params: speechParams,
    });
  

    return {
        props: {
            story,
            speechUrl: url,
        },
        revalidate: 1, 
    }
}