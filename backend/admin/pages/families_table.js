import { PageContainer, CellContainer } from '@keystone-6/core/admin-ui/components';
import { gql, useQuery } from '@keystone-6/core/admin-ui/apollo';

export default function CustomPage () {
  const { data, error } = useQuery(
    gql`
      query Family {
        families {
          id
          label
          lastname
          status
          primary_email
          primary_phone
          secondary_email
          secondary_phone
          smoking
          preference
          
          address
          city
          state
          zip
          
          groups {
            id
            name
            status
          }
          zone {
            id
            name
          }
        }
      }
    `,
  );

  const headerCellStyle = {
    align: 'left',
  };

  return (
    <PageContainer header="Families">
      <h1>Families</h1>

      {data?.families.map(fam => (
        <table className="css-1a6t5ca-TableContainer">
          <colgroup>
            <col width={200} />
            <col width={200} />
            <col width={200} />
            <col width={200} />
            <col width={200} />
          </colgroup>
          <thead>
            <tr>
              <th>Lastname: Zone</th>
              <th className="css-1dknosg-TableHeaderCell">Status</th>
              <th className="css-1dknosg-TableHeaderCell">Primary Email</th>
              <th className="css-1dknosg-TableHeaderCell">Primary Phone</th>
              <th className="css-1dknosg-TableHeaderCell">Smoking</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="css-1gt61m-TableBodyCell">{fam.label}</td>
              <td className="css-1gt61m-TableBodyCell">{fam.status}</td>
              <td className="css-1gt61m-TableBodyCell">{`${fam.primary_email}`}</td>
              <td className="css-1gt61m-TableBodyCell">{`${fam.primary_phone}`}</td>
              <td className="css-1gt61m-TableBodyCell">{`${fam.smoking}`}</td>
            </tr>
          </tbody>
        </table>
      ))}

    </PageContainer>
  )
}
