import React from 'react'

const Nav = () => {
    const links = [
        {
            label: 'Email',
            data: [
                { name: 'Yash Singh Bisht', link: 'Yashbisht0007@gmail.com' },
                { name: 'Shivam Sharma', link: 'shivam@gmail.com' },
                { name: 'Pratham Sharma', link: 'pratham@gmail.com' }
            ]
        },
        {
            label: 'Github',
            data: [
                { name: 'Yash Singh Bisht', link: 'https://github.com/yashbisht' },
                { name: 'Shivam Sharma', link: 'https://github.com/shivam' },
                { name: 'Pratham Sharma', link: 'https://github.com/pratham' }
            ]
        },
        {
            label: 'Linkedin',
            data: [
                { name: 'Yash Singh Bisht', link: 'https://linkedin.com/in/yashbisht' },
                { name: 'Shivam Sharma', link: 'https://linkedin.com/in/shivam' },
                { name: 'Pratham Sharma', link: 'https://linkedin.com/in/pratham' }
            ]
        },
        {
            label: 'Instagram',
            data: [
                { name: 'Yash Singh Bisht', link: 'https://instagram.com/yashbisht' },
                { name: 'Shivam Sharma', link: 'https://instagram.com/shivam' },
                { name: 'Pratham Sharma', link: 'https://instagram.com/pratham' }
            ]
        }
    ];

    return (
        <div className='fixed top-1 px-3 z-999 w-full h-auto'>

            <div className='relative Menu  flex justify-between items-center text-[#161616]/90'>
                <h1 className='cursor-pointer text-2xl font-bold'>SMDS.</h1>
                <h1 className='cursor-pointer'>Menu</h1>
            </div>

            {/* <div className='absolute top-50 left-0  w-full h-auto flex items-center justify-center p-3'>
                <div className='Extended Menu border w-full h-full border-white/30 rounded-2xl bg-[#161616]/80 backdrop-blur-[.8vh] px-3 py-2 space-y-2'>
                    <h1 className='font-bold opacity-70'>Links</h1>

                    <div className='border-b border-white/30 pb-3 -space-y-1'>
                        {links.map((link, i) => (
                            <div className=' flex justify-between items-center'>
                                <h1 key={i} className='text-4xl'>{link.label}</h1>
                                <ul className="pl-5 -space-y-2.5 flex flex-col ">
                                    {link.data.map((user, j) => (
                                        <li key={j}>
                                            <a href={user.link} target="_blank" rel="noopener noreferrer" className="text-white/70 text-[1vh] hover:text-white">{user.name}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div>

                    </div>


                </div>
            </div> */}
        </div>
    )
}

export default Nav
