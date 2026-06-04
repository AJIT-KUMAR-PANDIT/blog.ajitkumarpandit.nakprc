import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { PageBlocksStats } from "@/tina/__generated__/types";
import { Section } from "../layout/section";
import { sectionBlockSchemaField } from '../layout/section';

export const Stats = ({ data }: { data: PageBlocksStats }) => {
    return (
        <Section background={data.background!}>
            <div className="mx-auto max-w-[1024px] px-4 sm:px-5">
                {/* iOS section header */}
                <div className="mb-3 ml-3.5">
                    <h2 data-tina-field={tinaField(data, 'title')} className="text-[22px] font-bold tracking-tight text-[var(--ios-text-primary)]" style={{ WebkitFontSmoothing: "antialiased", letterSpacing: "-0.025em" }}>
                        {data.title}
                    </h2>
                </div>

                {/* Grouped container */}
                <div className="section-card overflow-hidden px-4 py-8 sm:px-6" style={{ boxShadow: '0 0 0 0.5px var(--ios-separator), 0 1px 3px rgba(0,0,0,0.04)' }}>
                    <div className="grid gap-8 text-center md:grid-cols-3">
                        {data.stats?.map((stat) => (
                            <div key={stat?.type} className="space-y-1.5">
                                <div data-tina-field={tinaField(stat, 'stat')} className="text-[40px] font-bold tracking-tighter text-[var(--ios-blue)] leading-none" style={{ WebkitFontSmoothing: "antialiased" }}>
                                    {stat!.stat}
                                </div>
                                <p data-tina-field={tinaField(stat, 'type')} className="text-[15px] font-medium text-[var(--ios-text-secondary)]">
                                    {stat!.type}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <p data-tina-field={tinaField(data, 'description')} className="mt-3 ml-3.5 text-[15px] leading-relaxed text-[var(--ios-text-secondary)]">
                    {data.description}
                </p>
            </div>
        </Section>
    )
}


export const statsBlockSchema: Template = {
    name: "stats",
    label: "Stats",
    ui: {
        previewSrc: "/blocks/stats.png",
        defaultItem: {
            title: "TinaCMS by the numbers",
            description: "TinaCMS is an open-source content management system that allows developers to create and manage content for their websites and applications. It provides a flexible and customizable framework for building content-driven applications.",
            stats: [
                {
                    stat: "12K",
                    type: "Stars on GitHub",
                },
                {
                    stat: "11K",
                    type: "Active Users",
                },
                {
                    stat: "22K",
                    type: "Powered Apps",
                },
            ],
        },
    },
    fields: [
        sectionBlockSchemaField as any,
        {
            type: "string",
            label: "Title",
            name: "title",
        },
        {
            type: "string",
            label: "Description",
            name: "description",
        },
        {
            type: "object",
            label: "Stats",
            name: "stats",
            list: true,
            ui: {
                defaultItem: {
                    stat: "12K",
                    type: "Stars on GitHub",
                },
                itemProps: (item) => {
                    return {
                        label: `${item.stat} ${item.type}`,
                    };
                },
            },
            fields: [
                {
                    type: "string",
                    label: "Stat",
                    name: "stat",
                },
                {
                    type: "string",
                    label: "Type",
                    name: "type",
                },
            ],
        },
    ],
};