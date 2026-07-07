# Composition Reference

## Compound Component

Sub-components attached as static properties.

```tsx
// sidebar/components/sidebar/index.tsx
import React from 'react';
import { SidebarContextProvider } from '../sidebar-context';
import { SideBarLink } from '../sidebar-link';
import { SideBarSection } from '../sidebar-section';
import { SideBarBase } from './sidebar-base';

type SideBarProps = {
    children: React.ReactNode;
};

export const SideBar = ({ children }: SideBarProps) => {
    return (
        <SidebarContextProvider>
            <SideBarBase>{children}</SideBarBase>
        </SidebarContextProvider>
    );
};

SideBar.Section = SideBarSection;
SideBar.Link = SideBarLink;
```

## Slot Props

Named `React.ReactNode` props for distinct layout areas.

```tsx
// layouts/default-layout/index.tsx
import React, { FC } from 'react';

export type DefaultLayoutProps = {
    content: React.ReactNode;
    header: React.ReactNode;
    sidebar: React.ReactNode;
    hasNoPaddingContent?: boolean;
    isFixedHeight?: boolean;
};

export const DefaultLayout: FC<DefaultLayoutProps> = ({
    content,
    header,
    sidebar,
    hasNoPaddingContent = false,
    isFixedHeight = false,
}) => {
    return (
        <Layout isFixedHeight={isFixedHeight}>
            <SideNav>{sidebar}</SideNav>
            <Header>{header}</Header>
            <Content $hasNoPaddingContent={hasNoPaddingContent}>
                {content}
            </Content>
        </Layout>
    );
};
```

## Provider Wrapper

Context wrapping children, conditionally applied based on props.

```tsx
// canvas/components/widget-container/index.tsx
import React from 'react';
import { WidgetActionsStateProvider } from '../../context/widget-actions-state';

export interface WidgetContainerProps {
    children: React.ReactNode;
    actionButtons?: React.ReactNode;
    hasActionButtons?: boolean;
}

export const WidgetContainer = ({
    children,
    actionButtons,
    hasActionButtons = false,
}: WidgetContainerProps) => {
    if (!hasActionButtons) {
        return children;
    }

    return (
        <WidgetActionsStateProvider>
            <WidgetContainerBase actionButtons={actionButtons}>
                {children}
            </WidgetContainerBase>
        </WidgetActionsStateProvider>
    );
};
```