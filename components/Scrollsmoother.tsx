import {useRef, useEffect} from 'react';
import SmoothScrollbar from 'smooth-scrollbar';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

// @ts-ignore
export default function Scrollsmoother({children, ...rest}) {
    let $content = useRef(null);
    let scrollbar = useRef(null);

    useEffect(() => {
        console.log('coso');
        gsap.registerPlugin(ScrollTrigger);
        const el = $content.current;
        // @ts-ignore
        scrollbar.current = SmoothScrollbar.init(document.body, {
            // renderByPixels: false,
            damping: 2,
            delegateTo: document
        });

        // @ts-ignore
        scrollbar.current.setPosition(0, 0);
        // @ts-ignore
        scrollbar.current.track.xAxis.element.remove();
        ScrollTrigger.scrollerProxy(el, {
            scrollTop(value) {
                if (arguments.length) {
                    // @ts-ignore
                    scrollbar.current.scrollTop = value;
                }
                // @ts-ignore
                return scrollbar.current.scrollTop;
            }
        });

        // @ts-ignore
        scrollbar.current.addListener(ScrollTrigger.update);

        return () => {
            if (scrollbar.current) {
                // @ts-ignore
                scrollbar.current.destroy();
                scrollbar.current = null;
            }
        };
    }, []);

    return (null
        // <div data-scrollbar ref={$content} {...rest}>
        //     <div className="container">{children}</div>
        // </div>
    );
}
