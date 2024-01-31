import CardProfile from "./CardProfile.tsx";


export default function Profile() {

    return (
        <div className=" h-screen isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div
                className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl  "
                aria-hidden="true"
                style={{ zIndex: -1 }} // Ensure the background is behind the header
            >
                <div
                    className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#1200b5] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                />
            </div>
            <div className="-mt-20 mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">profile</h2>
                <p className="mt-2 text-lg leading-8 text-gray-600">
                    It`s you
                </p>
    <div className={'mt-5'}>

                <CardProfile></CardProfile>
    </div>

            </div>


        </div>






    )
}