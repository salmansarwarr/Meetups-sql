import db from '../../utils/db';
import Head from 'next/head';
import MeetupDetails from '../../Components/meetups/MeetupDetail';

const getIds = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT _id FROM meetups', (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

const getMeetup = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM meetups WHERE _id = ${id}`, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

function MeetupDetailsPage(props) {
    return (
        <>
            <Head>
                <title>{props.title}</title>
                <meta name="description" content={props.description} />
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
    const ids = await getIds();

    return {
        fallback: 'blocking',
        paths: ids.map((id) => ({
            params: {
                meetupId: id.toString(),
            },
        })),
    };
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;

    console.log(context.params);
    console.log(meetupId);
    const selectedMeetup = await getMeetup(meetupId);

    console.log(selectedMeetup);

    return {
        props: {
            id: selectedMeetup[0]._id.toString(),
            image: selectedMeetup[0].image,
            description: selectedMeetup[0].description,
            address: selectedMeetup[0].address,
            title: selectedMeetup[0].title,
        },
    };
}

export default MeetupDetailsPage;
