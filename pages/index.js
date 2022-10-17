import Head from 'next/head'
import { MongoClient } from 'mongodb'
import MeetupList from "../Components/meetups/MeetupList"

function HomePage(props) {
    return (
        <>
            <Head>
                <title>React Meetups</title>
                <meta name='description' content='Browse a huge list of highly active React meetups'/>
            </Head>
            <MeetupList meetups={props.meetups}/>
        </>
    )
}

// export function getServerSideProps(context) {
//     const req = context.req
//     const res = context.res

//     //Fetch Data
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

export async function getStaticProps() {

    const client = await MongoClient.connect('mongodb+srv://msalmansarwar:1ka2ka3ka4@cluster0.0iczgaa.mongodb.net/meetups?retryWrites=true&w=majority')
    const db = client.db();

    const meetupsCollections = db.collection('meetups');

    const meetups = await meetupsCollections.find().toArray();

    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                image: meetup.image,
                address: meetup.address,
                id: meetup._id.toString()
            })),
        },
        revalidate: 1
    }
}

export default HomePage