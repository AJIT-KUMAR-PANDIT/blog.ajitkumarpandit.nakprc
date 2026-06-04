import Link from 'next/link'
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { iconSchema } from '@/tina/fields/icon';
import { Button } from '@/components/ui/button'
import { PageBlocksCta } from '@/tina/__generated__/types';
import { Icon } from '../icon';
import { Section } from '../layout/section';

export const CallToAction = ({ data }: { data: PageBlocksCta }) => {
    return (
        <Section>
            <div className="mx-auto max-w-[1024px] px-4 sm:px-5">
                {/* iOS section header */}
                <div className="mb-3 ml-3.5">
                    <h2 data-tina-field={tinaField(data, 'title')} className="text-[22px] font-bold tracking-tight text-[var(--ios-text-primary)]" style={{ WebkitFontSmoothing: "antialiased", letterSpacing: "-0.025em" }}>
                        {data.title}
                    </h2>
                </div>

                <p data-tina-field={tinaField(data, 'description')} className="mb-6 ml-3.5 text-[15px] leading-relaxed text-[var(--ios-text-secondary)]">
                    {data.description}
                </p>

                {/* iOS-style grouped card with buttons */}
                <div className="section-card p-0 overflow-hidden" style={{ boxShadow: '0 0 0 0.5px var(--ios-separator), 0 1px 3px rgba(0,0,0,0.04)' }}>
                    <div className="flex flex-wrap items-center justify-center gap-2 p-5">
                        {data.actions && data.actions.map(action => (
                            <div
                                key={action!.label}
                                data-tina-field={tinaField(action)}>
                                <Button
                                    asChild
                                    size="lg"
                                    variant={action!.type === 'link' ? 'ghost' : 'default'}
                                    className={action!.type === 'button' ? 'rounded-xl bg-[var(--ios-blue)] text-white hover:bg-[var(--ios-blue)]/90 font-semibold px-6 h-[38px] text-[15px]' : 'rounded-xl border border-[var(--ios-separator)] text-[var(--ios-text-primary)] hover:bg-[var(--ios-bg)] font-medium px-6 h-[38px] text-[15px]'}>
                                    <Link href={action!.link!}>
                                        {action?.icon && (<Icon data={action?.icon} />)}
                                        <span className="text-nowrap">{action!.label}</span>
                                    </Link>
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    )
}


export const ctaBlockSchema: Template = {
    name: "cta",
    label: "CTA",
    ui: {
        previewSrc: "/blocks/cta.png",
        defaultItem: {
            title: "Start Building",
            description: "Get started with TinaCMS today and take your content management to the next level.",
            actions: [
                {
                    label: 'Get Started',
                    type: 'button',
                    link: '/',
                },
                {
                    label: 'Book Demo',
                    type: 'link',
                    link: '/',
                },
            ],
        },
    },
    fields: [
        {
            type: "string",
            label: "Title",
            name: "title",
        },
        {
            type: "string",
            label: "Description",
            name: "description",
            ui: {
                component: "textarea",
            },
        },
        {
            label: 'Actions',
            name: 'actions',
            type: 'object',
            list: true,
            ui: {
                defaultItem: {
                    label: 'Action Label',
                    type: 'button',
                    icon: {
                        name: "Tina",
                        color: "white",
                        style: "float",
                    },
                    link: '/',
                },
                itemProps: (item) => ({ label: item.label }),
            },
            fields: [
                {
                    label: 'Label',
                    name: 'label',
                    type: 'string',
                },
                {
                    label: 'Type',
                    name: 'type',
                    type: 'string',
                    options: [
                        { label: 'Button', value: 'button' },
                        { label: 'Link', value: 'link' },
                    ],
                },
                iconSchema as any,
                {
                    label: 'Link',
                    name: 'link',
                    type: 'string',
                },
            ],
        },
    ],
};
