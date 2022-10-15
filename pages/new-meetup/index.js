import Head from "next/head";
import { useRouter } from "next/router";
import NewMeetupForm from "../../Components/meetups/NewMeetupForm";

function NewMeetup() {
    const router = useRouter();
    async function addMeetupHandler(enteredData) {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredData),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json()
        console.log(data);

        router.push('/');
    }

    return (
        <>
            <Head>
                <title>Add a new meetup</title>
                <meta name="description" content="Add your own meetups and create amazing networking oppurtunities"/>
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler}/>
        </>
    );
}

export default NewMeetup;
