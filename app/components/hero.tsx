import { Button } from "./ui/button";
import { motion } from "motion/react";
export default function Hero() {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 40,
            }}
            animate={{
                opacity:1,
                y:0
            }}
            transition={{
                duration:0.6
            }}
            className="container mx-auto relative h-[calc(100vh-64px)] flex flex-col sm:flex-row justify-center sm:justify-between  items-center"
        >
            <img
                className="sm:w-4/6 w-full sm:block"
                src="/hero-section.png"
                alt=""
            />
            <div className="w-full sm:w-2/6">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                    سریع، دقیق، آماده چاپ
                </h1>
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl ">
                    فاکتور حرفه‌ای بساز و همون لحظه برای مشتری بفرست.
                </p>
                <p className="text-sm sm:text-md md:text-lg lg:text-xl font-light text-gray-600">
                    یه فاکتور‌ساز سریع و مخصوص فروشگاه‌های آنلاین؛ محصولاتو
                    اضافه کن، فاکتور بساز، آنلاین برای مشتری بفرست و با QR Code
                    همیشه قابل دسترس نگهش دار. همه‌چی ساده، تمیز و بدون دردسر.
                </p>
                <div className="flex gap-3">
                    <Button className="mt-1">شروع کنید</Button>
                    <Button variant={"outline"} className="mt-1">
                        درباره ما
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}
