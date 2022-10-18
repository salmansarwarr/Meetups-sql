import { MongoClient, ObjectId } from "mongodb"
import Head from "next/head";
import MeetupDetails from "../../Components/meetups/MeetupDetail";

function MeetupDetailsPage(props) {
    return(
        <>
            <Head>
                <title>{props.title}</title>
                <meta name="description" content={props.description}/>
            </Head>
            <MeetupDetails
                id={props.id}
                image={props.image}
                title={props.title}
                address={props.address}
                description={props.description}
            />
        </>
    );
}

export async function getStaticPaths() {
    const client = await MongoClient.connect('mongodb+srv://msalmansarwar:1ka2ka3ka4@cluster0.0iczgaa.mongodb.net/meetups?retryWrites=true&w=majority')
    const db = client.db();

    const meetupsCollections = db.collection('meetups');

    const meetups = await meetupsCollections.find({}, {_id: 1}).toArray();

    return {
        fallback: 'blocking',
        paths: meetups.map(meetup => ({
            params: {
                meetupId: meetup._id.toString()
            }
        }))
    }
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId

    const client = await MongoClient.connect('mongodb+srv://msalmansarwar:1ka2ka3ka4@cluster0.0iczgaa.mongodb.net/meetups?retryWrites=true&w=majority')
    const db = client.db();

    const meetupsCollections = db.collection('meetups');

    const selectedMeetup = await meetupsCollections.findOne({_id: ObjectId(meetupId)});

    console.log(selectedMeetup);
    
    
    return {
        props: {
            id: selectedMeetup._id.toString(),
            image: selectedMeetup.image,
            description: selectedMeetup.description,
            address: selectedMeetup.address,
            title: selectedMeetup.title
        }
    }
}

export default MeetupDetailsPage;
