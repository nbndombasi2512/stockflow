# Styling Reference

## Basic Styled Component

```ts
import styled from 'styled-components';

export const StyledContainer = styled.div`
    padding: ${({ theme }) => theme.spacing.m};
    background-color: ${({ theme }) => theme.colors.system.white};
    border: 1px solid ${({ theme }) => theme.colors.system.grey[300]};
    border-radius: ${({ theme }) => theme.radius.sm};
`;
```

## Transient Props

```ts
import styled, { css } from 'styled-components';

type StyledWidgetContainerProps = {
    $hasError?: boolean;
    $isPreviewMode?: boolean;
};

export const StyledWidgetContainer = styled.div<StyledWidgetContainerProps>`
    border: ${({ $hasError, $isPreviewMode, theme }) => {
        if ($isPreviewMode) {
            return css`none`;
        }
        if ($hasError) {
            return css`1px solid ${theme.colors.system.red[500]}`;
        }
        return css`1px solid ${theme.colors.system.grey[300]}`;
    }};
`;
```

## Conditional Styles with css Helper

```ts
import styled, { css } from 'styled-components';

type StyledLinkProps = {
    $collapsed?: boolean;
};

export const StyledTopLinkContainer = styled.div<StyledLinkProps>`
    padding: ${({ theme }) => theme.spacing.s};

    ${({ $collapsed }) =>
        $collapsed &&
        css`
            padding: ${({ theme }) => theme.spacing.xxs};

            > span {
                opacity: 0;
            }
        `}
`;
```

## Reusable css Blocks

```ts
import styled, { css } from 'styled-components';

const iconStyles = css`
    font-size: ${({ theme }) => theme.textSizes.title6};
    color: ${({ theme }) => theme.colors.system.grey[700]};
    padding-left: ${({ theme }) => theme.spacing.xs};
`;

export const StyledIconArrowUp = styled(IconArrowUp)`
    ${iconStyles}
`;

export const StyledIconArrowDown = styled(IconArrowDown)`
    ${iconStyles}
`;
```

## Extending Components

```ts
import styled, { css } from 'styled-components';

type StyledEditableButtonProps = {
    $isActive?: boolean;
};

export const StyledEditableViewButton = styled(
    StyledButton,
)<StyledEditableButtonProps>`
    ${({ $isActive }) =>
        $isActive &&
        css`
            background-color: ${({ theme }) => theme.colors.brand.blue[200]};
        `}
`;
```

## Using .attrs()

```ts
import styled from 'styled-components';

export const SendButton = styled(Button).attrs(() => ({
    size: 's',
    variant: 'primary',
}))`
    background-color: ${({ theme }) => theme.colors.system.purple[500]};
    border-radius: 50%;
`;
```