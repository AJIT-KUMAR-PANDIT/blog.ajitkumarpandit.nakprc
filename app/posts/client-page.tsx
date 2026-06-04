'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { PostConnectionQuery, PostConnectionQueryVariables } from '@/tina/__generated__/types';
import ErrorBoundary from '@/components/error-boundary';
import { UserRound } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LargeTitleHeader } from '@/components/layout/nav/large-title-header';

interface ClientPostProps {
  data: PostConnectionQuery;
  variables: PostConnectionQueryVariables;
  query: string;
}

export default function PostsClientPage(props: ClientPostProps) {
  const posts = props.data?.postConnection.edges!.map((postData) => {
    const post = postData!.node!;
    const date = new Date(post.date!);
    let formattedDate = '';
    if (!isNaN(date.getTime())) {
      formattedDate = format(date, 'MMM dd, yyyy');
    }

    return {
      id: post.id,
      published: formattedDate,
      title: post.title,
      tags: post.tags?.map((tag) => tag?.tag?.name) || [],
      url: `/posts/${post._sys.breadcrumbs.join('/')}`,
      excerpt: post.excerpt,
      heroImg: post.heroImg,
      author: {
        name: post.author?.name || 'Anonymous',
        avatar: post.author?.avatar,
      }
    }
  });

  // iOS tag color mapping
  const tagColors: Record<string, string> = {
    'design': 'bg-[var(--ios-purple)]/15 text-[var(--ios-purple)]',
    'tech': 'bg-[var(--ios-blue)]/15 text-[var(--ios-blue)]',
    'web': 'bg-[var(--ios-teal)]/15 text-[var(--ios-teal)]',
    'code': 'bg-[var(--ios-green)]/15 text-[var(--ios-green)]',
  };

  return (
    <ErrorBoundary>
      <LargeTitleHeader title="Blog Posts" subtitle="Latest thoughts and tutorials" />

      <div className="px-4 sm:px-5 pt-4 space-y-3">
        {posts.map((post, idx) => (
          <Link key={post.id} href={post.url} className="block group">
            {/* Sectioned card */}
            <div
              className="section-card overflow-hidden transition-transform duration-[300ms] ease-[var(--spring-damp)] active:scale-[0.98]"
              style={{
                borderRadius: idx === 0 && posts.length > 1 ? '13px' : undefined,
                boxShadow: '0 0 0 0.5px var(--ios-separator), 0 1px 3px rgba(0,0,0,0.04)',
              }}
            >
              {post.heroImg && (
                <div className="relative w-full overflow-hidden" style={{ height: '200px' }}>
                  <Image
                    src={post.heroImg}
                    alt={post.title}
                    fill
                    className="object-cover transition-opacity duration-300 group-hover:opacity-[0.88]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              )}

              <div className="grouped-list-item !py-3.5">
                {/* Author avatar */}
                <Avatar className="size-9 shrink-0 border border-[var(--ios-separator)]">
                  {post.author.avatar && (
                    <AvatarImage
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="rounded-full"
                    />
                  )}
                  <AvatarFallback>
                    <UserRound size={16} strokeWidth={2} className="opacity-50 text-[var(--ios-text-quaternary)]" />
                  </AvatarFallback>
                </Avatar>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    {post.tags.slice(0, 3).filter(Boolean).map((tag) => (
                      <span
                        key={tag}
                        className={`rounded-md px-1.5 py-0.5 text-[11px] font-medium ${tagColors[(tag as string).toLowerCase()] || 'bg-[var(--ios-blue)]/12 text-[var(--ios-blue)]'}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-semibold leading-snug tracking-tight text-[17px] group-hover:text-[var(--ios-blue)]">
                    {post.title}
                  </h3>
                  <p className="mt-1 text-[14px] leading-relaxed text-[var(--ios-text-secondary)] line-clamp-2">
                    <TinaMarkdown content={post.excerpt} />
                  </p>
                </div>

                {/* Chevron */}
                <svg className="size-[19px] shrink-0 text-[var(--ios-text-quaternary)] transition-all duration-300 group-hover:text-[var(--ios-blue)] group-hover:translate-x-[2px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </ErrorBoundary>
  );
}
