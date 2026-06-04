import React from 'react';
import Link from 'next/link';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { PageBlocksCallout } from '@/tina/__generated__/types';
import { Section } from '../layout/section';

export const Callout = ({ data }: { data: PageBlocksCallout }) => {
    return (
        <Section className='py-6'>
            <div className="mx-auto max-w-[1024px] px-4 sm:px-5">
                {/* iOS grouped list callout */}
                <Link
                    data-tina-field={tinaField(data, 'url')}
                    href={data.url!}
                    className='group flex items-center gap-3 rounded-xl bg-[var(--ios-surface)] px-4 py-3.5 transition-all duration-[300ms] ease-[var(--spring-damp)] active:scale-[0.98] hover:bg-[var(--ios-bg)] block mx-auto max-w-lg'
                    style={{ boxShadow: '0 0 0 0.5px var(--ios-separator), 0 1px 3px rgba(0,0,0,0.04)' }}
                >
                    <span data-tina-field={tinaField(data, 'text')} className='flex-1 text-[15px] font-medium text-[var(--ios-text-primary)] leading-snug tracking-tight'>
                        {data.text}
                    </span>

                    <svg className="size-[19px] shrink-0 text-[var(--ios-blue)] transition-all duration-300 group-hover:translate-x-[2px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
        </Section>
    );
};


export const calloutBlockSchema: Template = {
    name: 'callout',
    label: 'Callout',
    ui: {
        previewSrc: '/blocks/callout.png',
        defaultItem: {
            url: 'https://tina.io/editorial-workflow',
            text: 'Support for live editing and editorial workflow',
        },
    },
    fields: [
        {
            type: 'string',
            label: 'Text',
            name: 'text',
        },
        {
            type: 'string',
            label: 'Url',
            name: 'url',
        },
    ],
};
