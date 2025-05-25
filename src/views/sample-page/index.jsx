// material-ui
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Container, TextField, styled } from '@mui/material';
import Button from '@mui/material/Button';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useCallback, useEffect, useState, useRef } from 'react';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import AddTodo from '../../components/AddTodo';
import Todos from '../../components/Todos';

const GradientBox = styled(Box)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  boxShadow: theme.shadows[4]
}));
// ==============================|| SAMPLE PAGE ||============================== //

export default function SamplePage() {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState('');
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);

  const passRef = useRef(null);
  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (numAllowed) str += '1234567890';
    if (charAllowed) str += '!@#$%^&*()<>?~';

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator]);

  const handleCopyPassword = useCallback(() => {
    const inputElement = passRef.current?.querySelector('input');
    if (inputElement) {
      inputElement.select();
      inputElement.setSelectionRange(0, 12);
      window.navigator.clipboard.writeText(password);
    }
  }, [password]);

  return (
    <MainCard title="Password Generator">
      <Box
        sx={{
          maxWidth: '600px',
          margin: '0 auto',
          padding: '30px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            value={password}
            label="Generated Password"
            variant="outlined"
            ref={passRef}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <Button onClick={handleCopyPassword} startIcon={<ContentCopyIcon />} sx={{ ml: 1 }}>
                  Copy
                </Button>
              )
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'white'
              }
            }}
          />
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" gutterBottom>
            Password Length: {length}
          </Typography>
          <Slider
            value={length}
            onChange={(e) => setLength(e.target.value)}
            min={4}
            max={32}
            valueLabelDisplay="auto"
            sx={{ width: '100%' }}
          />
        </Box>

        <FormGroup sx={{ mb: 3 }}>
          <FormControlLabel
            control={<Checkbox checked={numAllowed} onChange={(e) => setNumAllowed(e.target.checked)} />}
            label="Include Numbers"
          />
          <FormControlLabel
            control={<Checkbox checked={charAllowed} onChange={(e) => setCharAllowed(e.target.checked)} />}
            label="Include Special Characters"
          />
        </FormGroup>

        {/* <Button 
          variant="contained" 
          color="primary"
          onClick={passwordGenerator}
          fullWidth
          sx={{ 
            py: 1.5,
            fontSize: '1.1rem',
            textTransform: 'none'
          }}
        >
          Generate Password
        </Button> */}
      </Box>
      <Container maxWidth="md" sx={{ py: 6 }}>
        <GradientBox>
          <Typography variant="h4" component="h1" color="white" fontWeight="bold" gutterBottom>
            Redux Toolkit Todo Manager
          </Typography>
          <Typography variant="body1" color="white">
            Organize your tasks efficiently with our professional todo system
          </Typography>
        </GradientBox>

        <AddTodo />
        <Todos />
      </Container>
    </MainCard>
  );
}
