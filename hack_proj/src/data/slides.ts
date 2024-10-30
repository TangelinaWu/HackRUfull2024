type Props = {
    id: string,
    title: string,
    description: string,
    image: string
}

const slides: Props[] = [
    {
        id: '1',
        title: 'Never Forget Again',
        description: 'Set reminders for your daily tasks and never miss a thing. Our app ensures you stay on top of your to-dos.',
        image: require("../assets/Slides1.png")
    },
    {
        id: '2',
        title: 'Visual Memory Aid',
        description: 'Use images to jog your memory. When you need help, our app will show you the photos you took.',
        image: require("../assets/Slides2.png")
    },
    {
        id: '3',
        title: 'Stay Oriented',
        description: 'Never feel lost again. Our app helps you stay oriented by showing you the photos you took along your route.',
        image: require("../assets/Slides3.png")
    },
    {
        id: '4',
        title: 'Never Forget Again',
        description: 'Set reminders for your daily tasks and never miss a thing. Our app ensures you stay on top of your to-dos.',
        image: require("../assets/Slides4.png")
    },
]

export default slides