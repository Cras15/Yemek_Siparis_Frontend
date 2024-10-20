import { GroupRounded, KeyboardArrowDown } from '@mui/icons-material';
import { Box, Chip, List, ListItem, ListItemButton, listItemButtonClasses, ListItemContent, ListItemDecorator, Typography } from '@mui/joy'
import React from 'react'

const MSidebarItems = ({ title, link, icon, badge, children, selected }) => {
    if (children && children.length > 0) {
        return (
            <ListItem nested>
                <Toggler
                    renderToggle={({ open, setOpen }) => (
                        <ListItemButton onClick={() => setOpen(!open)} selected={selected}>
                            {icon}
                            <ListItemContent>
                                <Typography level="title-sm">{title}</Typography>
                            </ListItemContent>
                            <KeyboardArrowDown
                                sx={[
                                    open
                                        ? {
                                            transform: 'rotate(180deg)',
                                        }
                                        : {
                                            transform: 'none',
                                        },
                                ]}
                            />
                        </ListItemButton>
                    )}
                >
                    <List sx={{ gap: 0.5 }}>
                        {children.map((child, i) => (
                            <ListItem sx={{ mt: 0.5 }} key={i}>
                                <ListItemButton
                                    role="menuitem"
                                    component="a"
                                    href={child.link}
                                >
                                    {child.title}
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Toggler>
            </ListItem>
        );
    }

    return (
        <ListItem>
            <ListItemButton
                component="a"
                href={link}
                selected={selected}
                sx={{
                    [`&.${listItemButtonClasses.root}:hover`]: {
                        backgroundColor: 'action.hover',
                    },
                }}
            >
                <ListItemDecorator>
                    {icon}
                </ListItemDecorator>
                <ListItemContent>
                    <Typography level="title-sm">{title}</Typography>
                </ListItemContent>
                {badge && (
                    <Chip size="sm" color="primary" variant='soft'>
                        <Typography level="body-xs" sx={{ ml: 'auto', color: 'text.secondary' }}>
                            {badge}
                        </Typography>
                    </Chip>
                )}
            </ListItemButton>
        </ListItem>
    );
};


export default MSidebarItems

function Toggler({ defaultExpanded = false, renderToggle, children }) {
    const [open, setOpen] = React.useState(defaultExpanded)
    return (
        <React.Fragment>
            {renderToggle({ open, setOpen })}
            <Box
                sx={[
                    {
                        display: "grid",
                        transition: "0.2s ease",
                        "& > *": {
                            overflow: "hidden"
                        }
                    },
                    open ? { gridTemplateRows: "1fr" } : { gridTemplateRows: "0fr" }
                ]}
            >
                {children}
            </Box>
        </React.Fragment>
    )
}
