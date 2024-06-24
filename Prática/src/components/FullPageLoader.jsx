import 'ldrs/ring'

import { hourglass } from 'ldrs'

hourglass.register()




function Loader({ bg }) {


    return (
        <>
            <div style={{ backgroundColor: bg ? bg : '' }} className="full-page-loader">
                < l-hourglass
                    size="40"
                    bg-opacity="0.1"
                    speed="1.0"
                    color="black"
                >
                </l-hourglass >
            </div>

        </>
    )
}

export default Loader
