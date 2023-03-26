import Head from 'next/head';
import db from '../utils/db';
import MeetupList from '../Components/meetups/MeetupList';

const getMeetups = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM meetups', (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

function HomePage(props) {
    return (
        <>
            <Head>
                <title>React Meetups</title>
                <meta
                    name="description"
                    content="Browse a huge list of highly active React meetups"
                />
            </Head>
            <MeetupList meetups={props.meetups} />
        </>
    );
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
    const meetups = await getMeetups();
    return {
        props: {
            meetups: meetups.map((meetup) => ({
                title: meetup.title,
                image: meetup.image,
                address: meetup.address,
                id: meetup._id.toString(),
            })),
        },
    };
}

export default HomePage;
