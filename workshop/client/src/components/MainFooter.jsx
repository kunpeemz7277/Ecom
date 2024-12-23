import React from 'react'
import { ChevronUp } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'

function Footer() {
    const navigate = useNavigate();

    const handleSmallpotClick = () => {
        // Navigate ไปหน้า shop พร้อมส่งข้อมูลไปยัง state หรือ parameter
        navigate('/shop', { state: { selectedCategory: 'Smallpot' } });
    };

    return (
        <div className='flex mt-8 bg-gray-300 py-14 '>
            <div className="container mx-auto grid  md:grid-cols-4 gap-2">
                <div>
                    <div className="mt-36 space-y-3 text-xl">
                        <p><strong>Phone:</strong> +66 98 285 1542</p>
                        <p><strong>Email:</strong> kunpeemz@gmail.com</p>
                        <p><strong>Address:</strong> Phra Samut Chedi, Samut Prakan, Thailand 20000</p>
                    </div>
                </div>


                <div>
                    <h3 className="font-bold mb-4 text-2xl">ศูนย์ช่วยเหลือ</h3>
                    <ul className="space-y-3 text-xl">
                        <li>
                            <Link to={'/'}
                                onClick={() => window.scrollTo({ top: 0 })}>
                                <p className="hover:underline">หน้าแรก</p>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/aboutme'}
                                onClick={() => window.scrollTo({ top: 0 })}>
                                <p className="hover:underline">เกี่ยวกับเรา</p>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/idea'}
                                onClick={() => window.scrollTo({ top: 0 })}>
                                <p href="#" className="hover:underline">ไอเดีย</p>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/shop'}
                                onClick={() => window.scrollTo({ top: 0 })}>
                                <p href="#" className="hover:underline">สินค้า</p>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/faq'}
                                onClick={() => window.scrollTo({ top: 0 })}>
                                <p href="#" className="hover:underline">คำถามที่พบบ่อย</p>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/article'}
                                onClick={() => window.scrollTo({ top: 0 })}>
                                <p href="#" className="hover:underline">บทความ</p>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/contact'}
                                onClick={() => window.scrollTo({ top: 0 })}>
                                <p href="#" className="hover:underline">ติดต่อเรา</p>
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold mb-4 text-2xl">สินค้าตามหมวดหมู่</h3>
                    <ul className="space-y-3 text-xl">
                        <li>
                            <Link to={'/shop'}
                                onClick={() => window.scrollTo({ top: 0 })}>
                                <p href="#" className="hover:underline">Smallpot</p>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/shop'}
                                onClick={() => window.scrollTo({ top: 0 })}>
                                <p href="#" className="hover:underline">Mediumpot</p>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/shop'}
                                onClick={() => window.scrollTo({ top: 0 })}>
                                <p href="#" className="hover:underline">Tools</p>
                            </Link>
                        </li>
                    </ul>
                    <div className="mt-4">
                        <p className="mb-5 text-xl">ยินดีรับชำระเงินง่าย</p>
                        <img src="https://www.designil.com/wp-content/uploads/2020/04/prompt-pay-logo.png" alt="PromptPay" className="h-12" />
                    </div>
                </div>

            </div>

            <div className="flex flex-col items-center gap-10 mr-9 mt-60 hover:text-black hover:-translate-y-1 duration-300 transform" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <a
                    className="text-gray-500  -rotate-90"
                >
                    BACK TO TOP
                </a>
                <div className="rounded-3xl border-black p-3 border ">
                    <ChevronUp />
                </div>
            </div>
        </div>
    )
}

export default Footer