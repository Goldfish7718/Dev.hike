const convertDate = (localeDateString) => {

    const date = localeDateString.split('/')[0]
    const month = localeDateString.split('/')[1]
    const year = localeDateString.split('/')[2]

    switch (month) {
        case '1':
            return `${date} January ${year}`

        case '2':
            return `${date} February ${year}`

        case '3':
            return `${date} March ${year}`

        case '4':
            return `${date} April ${year}`
        
        case '5':
            return `${date} May ${year}`

        case '6':
            return `${date} June ${year}`

        case '7':
            return `${date} July ${year}`

        case '8':
            return `${date} August ${year}`

        case '9':
            return `${date} September ${year}`

        case '10':
            return `${date} October ${year}`

        case '11':
            return `${date} November ${year}`

        case '12':
            return `${date} December ${year}`
    }
}

export default convertDate