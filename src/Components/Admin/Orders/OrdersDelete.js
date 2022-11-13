import { Box, CircularProgress, Fab } from '@mui/material';
import { useEffect, useState } from 'react';
import { Check, DeleteForever } from '@mui/icons-material';
import { red } from '@mui/material/colors';
import OrdersService from '../../../Services/OrdersService';

const OrdersDelete = ({ params, rowId, setRowId }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    const result = await OrdersService.deleteOrder(params.id);
    
    if (result) {
      setSuccess(true);
      setRowId(null);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (rowId === params.id && success) setSuccess(false);
  }, [rowId]);

  return (
    <Box
      sx={{
        m: 1,
        position: 'relative',
      }}
    >
      {success ? (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: red[500],
            '&:hover': { bgcolor: red[700] },
          }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
          }}
          onClick={handleSubmit}
        >
          <DeleteForever />
        </Fab>
      )}
      {loading && (
        <CircularProgress
          size={52}
          sx={{
            color: red[500],
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}
    </Box>
  );
};

export default OrdersDelete;