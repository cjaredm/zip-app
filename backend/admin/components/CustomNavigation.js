import { NavigationContainer, ListNavItems, NavItem } from '@keystone-6/core/admin-ui/components';

export function CustomNavigation({ lists, authenticatedItem }) {
  return (
    <NavigationContainer authenticatedItem={authenticatedItem}>
      <NavItem href="/">Dashboard</NavItem>
      <NavItem href="/families_table">Family Table</NavItem>
      <ListNavItems lists={lists} />
    </NavigationContainer>
  )
}
