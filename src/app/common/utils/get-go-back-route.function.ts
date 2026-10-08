export function getGoBackRoute(url: string): string {
  const isCarRoute = url.includes('/v/cars');
  const isAdminCarsRoute = url.includes('/v/admin/cars');
  const isAdminUsersRoute = url.includes('/v/admin/users');
  const isAdminUsersCarRoute = url.includes('/v/admin/users/') && url.includes('/car/');

  if (isAdminUsersCarRoute) {
    return url.split('/car/')[0];
  }

  if (isAdminCarsRoute) {
    return '/v/admin/cars';
  }

  if (isAdminUsersRoute) {
    return '/v/admin/users';
  }

  if (isCarRoute) {
    return '/v/cars';
  }

  return '/v/admin';
}
