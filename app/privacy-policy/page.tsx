import React from 'react'
import Link from 'next/link'
import { promises as fs } from 'fs'
import { join } from 'path'
import ReactMarkdown from 'react-markdown'

const PrivacyPolicy = async () => {
    let content = ''
    try {
        const filePath = join(process.cwd(), 'public/legal/PRIVACY_POLICY.md')
        content = await fs.readFile(filePath, 'utf-8')
    } catch (error) {
        content = '# Privacy Policy\n\nUnable to load privacy policy.'
    }

    return (
        <div className='min-h-screen bg-white dark:bg-black text-black dark:text-white pt-20'>
            <div className='max-w-4xl mx-auto px-4 md:px-8 py-12'>
                <Link href="/" className='text-blue-600 dark:text-blue-400 hover:underline mb-8 inline-block'>
                    ← Back to home
                </Link>
                
                <div className='prose dark:prose-invert max-w-none text-black dark:text-white
                    [&_h1]:text-4xl [&_h1]:md:text-5xl [&_h1]:font-bold [&_h1]:mb-8
                    [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-4
                    [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-3
                    [&_p]:mb-4 [&_p]:leading-relaxed
                    [&_ul]:list-disc [&_ul]:list-inside [&_ul]:mb-4 [&_ul]:space-y-2
                    [&_ol]:list-decimal [&_ol]:list-inside [&_ol]:mb-4 [&_ol]:space-y-2
                    [&_li]:mb-1
                    [&_strong]:font-bold
                    [&_em]:italic
                '>
                    <ReactMarkdown>{content}</ReactMarkdown>
                </div>

                <div className='mt-16 pt-8 border-t border-gray-300 dark:border-gray-700'>
                    <Link href="/terms" className='text-blue-600 dark:text-blue-400 hover:underline'>
                        View Terms of Service →
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PrivacyPolicy
